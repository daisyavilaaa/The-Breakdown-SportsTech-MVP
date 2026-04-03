import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { GeometricBackground } from "@/components/GeometricBackground";
import { Footer } from "@/components/Footer";
import { IntakeForm, type IntakeData } from "@/components/submission/IntakeForm";
import { AiChat } from "@/components/submission/AiChat";
import { SummaryReview, type SubmissionSummary } from "@/components/submission/SummaryReview";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

type Step = "form" | "ai-chat" | "summary";

const UploadFilm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const athleteId = searchParams.get("athlete");
  const { user, loading } = useAuth();
  const [step, setStep] = useState<Step>("form");
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [generatedSummary, setGeneratedSummary] = useState<SubmissionSummary | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const currentPath = athleteId ? `/upload?athlete=${athleteId}` : "/upload";
  const redirectParam = encodeURIComponent(currentPath);

  const handleIntakeSubmit = (data: IntakeData) => {
    setIntakeData(data);
    setStep("ai-chat");
  };

  const handleChatComplete = (messages: any[], summary: SubmissionSummary) => {
    setConversationHistory(messages);
    setGeneratedSummary(summary);
    setStep("summary");
  };

  const handleFinalSubmit = async (editedSummary: SubmissionSummary) => {
    if (!intakeData || !user) return;

    try {
      const { data, error } = await supabase.from("submissions").insert([{
        sport: intakeData.sport,
        position_event: intakeData.position,
        age: intakeData.age,
        video_type: intakeData.videoType,
        issue_context: intakeData.issueContext,
        skill_area: intakeData.skillArea,
        name: intakeData.name,
        email: intakeData.email,
        conversation_history: conversationHistory as any,
        generated_summary: generatedSummary as any,
        edited_summary: editedSummary as any,
        user_id: user.id,
        athlete_id: athleteId || null,
        video_url: videoUrl,
      }]).select("id").single();

      if (error) throw error;
      navigate("/thank-you", { state: { submissionId: data.id } });
    } catch (e) {
      console.error("Submission error:", e);
      toast.error("Failed to save submission. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-page flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen gradient-page">
        <Navbar />
        <div className="container-page py-32 text-center max-w-md mx-auto relative overflow-hidden">
          <GeometricBackground position="both" opacity={0.08} />
          <BackButton />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-3">Sign in to submit film</h1>
          <p className="text-muted-foreground mb-8">Create an account or sign in to submit your film for a breakdown.</p>
          <div className="flex flex-col items-center gap-3">
            <Link to={`/signup?redirect=${redirectParam}`}>
              <Button className="gap-2 w-48">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
            <Link to={`/login?redirect=${redirectParam}`}>
              <Button variant="outline" className="gap-2 w-48">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-page">
      <Navbar />
      <div className="container-page py-16 max-w-2xl mx-auto">
        <BackButton />
        <AnimatePresence mode="wait">
          {step === "form" && <IntakeForm onSubmit={handleIntakeSubmit} />}
          {step === "ai-chat" && intakeData && (
            <AiChat intakeData={intakeData} onComplete={handleChatComplete} />
          )}
          {step === "summary" && intakeData && generatedSummary && (
            <SummaryReview intakeData={intakeData} summary={generatedSummary} onSubmit={handleFinalSubmit} />
          )}
        </AnimatePresence>
      </div>
      <div className="relative">
        <GeometricBackground position="bottom" opacity={0.08} className="!h-48" />
      </div>
      <Footer />
    </div>
  );
};

export default UploadFilm;
