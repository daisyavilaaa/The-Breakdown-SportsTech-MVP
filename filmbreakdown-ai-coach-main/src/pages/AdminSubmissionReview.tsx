import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { StatusBadge } from "@/components/StatusBadge";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Video, User, Target, Sparkles } from "lucide-react";
import { GeometricBackground } from "@/components/GeometricBackground";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const AdminSubmissionReview = () => {
  const { id } = useParams();
  const { user, userRole, loading: authLoading } = useAuth();
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !user) return;
    supabase.from("submissions").select("*").eq("id", id).single().then(({ data }) => {
      setSubmission(data);
      setLoading(false);
    });
  }, [id, user]);

  if (authLoading) return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading…</p></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (userRole && userRole !== "admin") return <Navigate to="/" replace />;

  if (loading) return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading…</p></div>;
  if (!submission) return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Submission not found.</p></div>;

  const summary = submission.edited_summary || submission.generated_summary;

  return (
    <div className="min-h-screen gradient-page relative">
      <GeometricBackground position="bottom" opacity={0.06} />
      <Navbar />
      <div className="container-page py-8">
        <BackButton />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Review: {submission.name || "Anonymous"}</h1>
            <p className="text-sm text-muted-foreground mt-1">{submission.sport} · {submission.position_event} · {new Date(submission.created_at).toLocaleDateString()}</p>
          </div>
          <StatusBadge status={submission.status} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {submission.video_url ? (
              <video src={submission.video_url} controls className="w-full aspect-video bg-black rounded-lg" />
            ) : (
              <VideoPlayer />
            )}
            <div className="mt-6">
              <Link to={`/admin/studio/${submission.id}`}>
                <Button className="w-full gap-2" size="lg">
                  <Video className="h-4 w-4" />
                  Start Breakdown Recording
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Athlete Info</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="text-foreground font-medium">{submission.name || "Anonymous"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sport</span><span className="text-foreground font-medium">{submission.sport}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Position</span><span className="text-foreground font-medium">{submission.position_event}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Age</span><span className="text-foreground font-medium">{submission.age}</span></div>
              </div>
            </div>

            {summary && (
              <div className="p-5 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">AI Summary</h3>
                </div>
                <div className="space-y-3 text-sm">
                  {summary.primaryFocus && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Primary Focus</p>
                      <div className="flex flex-wrap gap-1">{summary.primaryFocus.map((f: string) => <span key={f} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">{f}</span>)}</div>
                    </div>
                  )}
                  {summary.userConcern && <div><p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">User Concern</p><p className="text-foreground">{summary.userConcern}</p></div>}
                  {summary.keyQuestion && <div><p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Key Question</p><p className="text-foreground">{summary.keyQuestion}</p></div>}
                </div>
              </div>
            )}

            <div className="p-5 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Issue Context</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{submission.issue_context}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissionReview;
