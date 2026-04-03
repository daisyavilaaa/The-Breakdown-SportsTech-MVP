import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Play, Clock, ChevronRight, User, ArrowLeft } from "lucide-react";
import { GeometricBackground } from "@/components/GeometricBackground";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface SubmissionRequest {
  id: string;
  name: string | null;
  age: number;
  position_event: string;
  sport: string;
  skill_area: string;
  issue_context: string;
  status: string;
  created_at: string;
  edited_summary: any;
  generated_summary: any;
}

const PortalHome = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const [requests, setRequests] = useState<SubmissionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Get the elite profile for this user
      const { data: ep } = await supabase
        .from("elite_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setProfile(ep);

      if (ep) {
        // Get submissions assigned to this athlete
        const { data: subs } = await supabase
          .from("submissions")
          .select("*")
          .eq("athlete_id", ep.id)
          .order("created_at", { ascending: false });

        setRequests(subs || []);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen gradient-page flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (userRole && userRole !== "elite_athlete" && userRole !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen gradient-page relative">
      <GeometricBackground position="bottom" opacity={0.06} />
      <header className="h-14 bg-transparent backdrop-blur-xl flex items-center justify-between px-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg text-foreground tracking-tight">The Breakdown</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">Athlete Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/portal" className="text-sm text-foreground font-medium">Requests</Link>
          <Link to="/portal/library" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">My Library</Link>
          <Link to="/portal/profile" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-150">
            <span className="text-sm text-muted-foreground">{profile?.full_name || user.email}</span>
            {profile?.profile_image_url && (
              <div className="w-8 h-8 rounded-md overflow-hidden ring-1 ring-border">
                <img src={profile.profile_image_url} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">Your Requests</h1>
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading…" : `${requests.length} breakdown${requests.length !== 1 ? "s" : ""} waiting`}
          </p>
        </div>

        {!loading && requests.length === 0 && (
          <div className="text-center py-24 border border-dashed border-border rounded-lg">
            <p className="text-foreground font-medium text-sm mb-1">No requests yet.</p>
            <p className="text-muted-foreground text-xs">When youth athletes submit film for you, their requests will appear here.</p>
          </div>
        )}

        <div className="space-y-2">
          {requests.map((request) => (
            <Link key={request.id} to={`/portal/breakdown/${request.id}`} className="group block">
              <div className="flex items-center gap-5 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors duration-150">
                <div className={cn("w-24 h-16 rounded-md bg-gradient-to-br from-primary/30 to-secondary flex-shrink-0 flex items-center justify-center")}>
                  <Play className="h-5 w-5 text-muted-foreground/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {request.age} y/o {request.position_event}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{request.skill_area}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-0.5 truncate group-hover:text-primary transition-colors duration-150">
                    {request.name || "Anonymous"} — {request.skill_area}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">{request.issue_context}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">~2 min</span>
                  </div>
                  <Button size="sm" className="gap-1.5 text-xs h-8">
                    Start Breakdown
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PortalHome;
