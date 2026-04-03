import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Calendar, User, ChevronRight } from "lucide-react";
import { GeometricBackground } from "@/components/GeometricBackground";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });
      setSubmissions(data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  if (authLoading) return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading…</p></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (userRole && userRole !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen gradient-page relative">
      <GeometricBackground position="bottom" opacity={0.06} />
      <Navbar />
      <div className="container-page py-8">
        <BackButton />
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-8">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4 mb-10">
          <MetricCard label="Total Submissions" value={submissions.length} />
          <MetricCard label="New" value={submissions.filter((s) => s.status === "submitted").length} />
          <MetricCard label="In Review" value={submissions.filter((s) => s.status === "in-review").length} />
          <MetricCard label="Completed" value={submissions.filter((s) => s.status === "completed").length} />
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-4">Submissions</h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-lg bg-secondary animate-pulse" />)}
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20"><p className="text-muted-foreground text-sm">No submissions yet.</p></div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => (
              <Link key={sub.id} to={`/admin/submissions/${sub.id}`}>
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-card transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{sub.name || sub.email || "Anonymous"}</p>
                      <p className="text-xs text-muted-foreground">{sub.sport} · {sub.position_event}</p>
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
    </div>
  );
};

export default AdminDashboard;
