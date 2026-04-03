import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

export function Navbar() {
  const { user, userRole, loading, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-2xl" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container-page flex items-center justify-between" style={{ height: 72 }}>
        <Link to="/" className="tracking-tight text-foreground mx-[32px] my-[2px] px-[17px] py-[11px] font-extrabold text-2xl">
          The Breakdown
        </Link>

        <div className="flex items-center" style={{ gap: 28 }}>
          <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors duration-150 text-lg font-bold">
            Learn
          </Link>

          {user && userRole === "elite_athlete" && (
            <Link to="/portal" className="text-muted-foreground hover:text-foreground transition-colors duration-150 text-lg font-extrabold">
              Portal
            </Link>
          )}

          {user && userRole === "youth_athlete" && (
            <Link to="/my-submissions" className="text-muted-foreground hover:text-foreground transition-colors duration-150 text-lg font-bold">
              My Film
            </Link>
          )}

          <Link to="/onboarding/elite" className="text-muted-foreground hover:text-foreground transition-colors duration-150 text-lg font-extrabold">
            Apply
          </Link>

          {!loading && (
            user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                  {user.user_metadata?.display_name || user.email}
                </span>
                <Button size="sm" variant="ghost" onClick={signOut} className="h-8 px-2">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/signup">
                  <Button size="sm" className="h-8 rounded-lg text-base font-bold font-sans my-0 py-[6px] px-[23px] bg-primary hover:text-accent-foreground">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="sm" className="h-8 rounded-lg btn-glow text-base font-bold font-sans my-0 py-[6px] px-[23px]">
                    Login
                  </Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
