import { Link } from "react-router-dom";
import { GeometricBackground } from "@/components/GeometricBackground";

export function Footer() {
  return (
    <footer className="relative" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <GeometricBackground position="top" opacity={0.08} className="!h-32" />
      <div className="container-page py-10 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} The Breakdown. All rights reserved.
          </span>
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">Athletes</Link>
            <Link to="/upload" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">Submit Film</Link>
            <Link to="/portal" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">Athlete Portal</Link>
            <span className="text-xs text-muted-foreground">Privacy</span>
            <span className="text-xs text-muted-foreground">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
