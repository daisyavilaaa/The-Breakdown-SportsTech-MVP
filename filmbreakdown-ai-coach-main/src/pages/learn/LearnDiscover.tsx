import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { GeometricBackground } from "@/components/GeometricBackground";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LearnDiscover = () => {
  return (
    <div className="min-h-screen gradient-page">
      <Navbar />
      <div className="relative">
        <GeometricBackground position="top" opacity={0.08} className="!h-48" />
      </div>
      <main className="container-page py-16">
        <div className="text-center py-24">
          <Lock className="h-12 w-12 mx-auto text-muted-foreground/40 mb-6" />
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-2">Coming Soon</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            The Learn section is being built. Soon you'll be able to browse training videos and drills from elite athletes.
          </p>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LearnDiscover;
