import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { GeometricBackground } from "@/components/GeometricBackground";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Film, ChevronRight } from "lucide-react";

const MySubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("submissions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setSubmissions(data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen gradient-page">
        <Navbar />
        <div className="container-page py-20 text-center">
          <p className="text-muted-foreground">Please sign in to view your submissions.</p>
          <Link to="/login" className="text-primary text-sm hover:underline mt-4 inline-block">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-page relative">
      <GeometricBackground position="bottom" opacity={0.06} />
      <Navbar />
      <div className="container-page py-8">
        <BackButton />
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">My Submissions</h1>
          <p className="text-sm text-muted-foreground">Track your film submissions and view completed breakdowns.</p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-lg bg-secondary animate-pulse" />)}
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border rounded-lg">
            <Film className="h-10 w-10 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-foreground font-medium text-sm mb-1">No submissions yet.</p>
            <p className="text-muted-foreground text-xs mb-5">Browse athletes and submit your first film for a breakdown.</p>
            <Link to="/athletes" className="text-primary text-sm hover:underline">Browse Athletes</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => (
              <Link key={sub.id} to={`/submission/${sub.id}`}>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors duration-150 cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                      <Film className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{sub.sport} · {sub.position_event}</p>
                      <p className="text-xs text-muted-foreground">{sub.skill_area}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(sub.created_at).toLocaleDateString()}
                    </div>
                    <StatusBadge status={sub.status} />
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MySubmissions;
