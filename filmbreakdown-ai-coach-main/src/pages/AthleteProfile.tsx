import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { GeometricBackground } from "@/components/GeometricBackground";
import { athletes as mockAthletes, type Athlete } from "@/data/mockData";
import { Star, CheckCircle, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AthleteProfile = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Check mock data first
      const mock = mockAthletes.find((a) => a.id === id);
      if (mock) {
        setAthlete(mock);
        setIsMock(true);
        setLoading(false);
        return;
      }

      // Try real DB profile
      const { data } = await supabase
        .from("elite_profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setAthlete({
          id: data.id,
          name: data.full_name,
          sport: data.sport,
          specialty: data.public_title,
          image: data.profile_image_url || "/placeholder.svg",
          rating: 5.0,
          reviewCount: 0,
          bio: data.value_statement || "",
          achievements: [...(data.achievements || []), ...(data.custom_achievements || [])],
          expertise: [...(data.expertise || []), ...(data.custom_expertise || [])],
          submissionGuide: data.submission_preferences || [],
          recommendedClips: [...(data.clip_types || []), ...(data.custom_clip_types || [])],
          exampleQuestions: [...(data.example_questions || []), ...(data.custom_questions || [])],
        });
        setIsMock(false);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-page">
        <Navbar />
        <div className="container-page py-20 text-center">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="min-h-screen gradient-page">
        <Navbar />
        <div className="container-page py-20 text-center">
          <p className="text-muted-foreground">Athlete not found.</p>
          <Link to="/" className="text-primary text-sm hover:underline mt-4 inline-block">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-page">
      <Navbar />

      <div className="relative">
        <GeometricBackground position="top" opacity={0.08} className="!h-40" />
      </div>

      <div className="container-page py-8">
        <BackButton />

        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <div className="aspect-[4/5] rounded-[14px] overflow-hidden mb-6" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <img src={athlete.image} alt={athlete.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-foreground text-foreground" />
              <span className="text-sm font-medium text-foreground">{athlete.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">· Elite Reviewer</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="text-sm text-primary font-medium">{athlete.sport}</p>
              <h1 className="text-3xl font-semibold tracking-tight mt-1 text-foreground">{athlete.name}</h1>
              <p className="text-muted-foreground mt-1">{athlete.specialty}</p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-xl">{athlete.bio}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {athlete.achievements.map((a) => (
                  <span key={a} className="px-3 py-1 rounded-md text-xs font-medium text-muted-foreground" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>{a}</span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-foreground">Areas of Expertise</h2>
              <div className="grid grid-cols-2 gap-3">
                {athlete.expertise.map((e) => (
                  <div key={e} className="flex items-center gap-2 p-3 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {athlete.submissionGuide.length > 0 && (
              <div className="p-6 rounded-[14px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="text-lg font-semibold mb-4 text-foreground">Submission Guide</h2>
                <p className="text-sm text-muted-foreground mb-4">Follow these guidelines for the best breakdown:</p>
                <ul className="space-y-2">
                  {athlete.submissionGuide.map((g) => (
                    <li key={g} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {athlete.recommendedClips.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-foreground">Recommended Clip Types</h2>
                <div className="flex flex-wrap gap-2">
                  {athlete.recommendedClips.map((c) => (
                    <span key={c} className="px-3 py-1.5 rounded-[10px] text-sm text-foreground" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            {athlete.exampleQuestions.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-foreground">Example Questions</h2>
                <div className="space-y-2">
                  {athlete.exampleQuestions.map((q) => (
                    <div key={q} className="p-3 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-sm text-foreground italic">"{q}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Only show Request Breakdown for real (non-mock) athletes */}
            {!isMock && (
              <div className="pt-4">
                <Link to={`/upload?athlete=${athlete.id}`}>
                  <Button size="lg" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Request Breakdown
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AthleteProfile;
