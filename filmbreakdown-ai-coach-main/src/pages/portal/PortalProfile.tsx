import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GeometricBackground } from "@/components/GeometricBackground";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const PortalProfile = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("elite_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setProfile(data);
      setLoading(false);
    };
    load();
  }, [user]);

  if (authLoading) return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading…</p></div>;
  if (!user) return <Navigate to="/login" replace />;

  if (loading) return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading profile…</p></div>;

  if (!profile) {
    return (
      <div className="min-h-screen gradient-page flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground font-medium mb-2">No elite profile found.</p>
          <Link to="/onboarding/elite" className="text-primary text-sm hover:underline">Complete your onboarding</Link>
        </div>
      </div>
    );
  }

  const expertise = [...(profile.expertise || []), ...(profile.custom_expertise || [])];
  const achievements = [...(profile.achievements || []), ...(profile.custom_achievements || [])];
  const submissionGuide = [...(profile.submission_preferences || []), ...(profile.custom_submission_preferences || [])];

  return (
    <div className="min-h-screen gradient-page relative">
      <GeometricBackground position="bottom" opacity={0.06} />
      <header className="h-14 bg-transparent backdrop-blur-xl flex items-center px-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link to="/portal" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to requests</span>
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-start gap-6 mb-10">
          {profile.profile_image_url && (
            <div className="w-20 h-20 rounded-lg overflow-hidden ring-1 ring-border flex-shrink-0">
              <img src={profile.profile_image_url} alt={profile.full_name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight mb-1">{profile.full_name}</h1>
            <p className="text-sm text-primary font-medium mb-3">{profile.sport} · {profile.position_label}</p>
            {profile.value_statement && <p className="text-sm text-muted-foreground leading-relaxed">{profile.value_statement}</p>}
          </div>
        </div>

        {achievements.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {achievements.map((tag: string) => (
              <span key={tag} className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">{tag}</span>
            ))}
          </div>
        )}

        {expertise.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-4">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill: string) => (
                <span key={skill} className="px-3 py-1.5 rounded-md bg-secondary text-foreground text-sm border border-border">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {submissionGuide.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-4">Submission Guide</h2>
            <div className="space-y-2">
              {submissionGuide.map((item: string, i: number) => (
                <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-primary font-mono text-xs mt-0.5">{i + 1}.</span>
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PortalProfile;
