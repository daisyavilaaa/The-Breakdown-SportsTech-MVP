import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Footer } from "@/components/Footer";
import { GeometricBackground } from "@/components/GeometricBackground";
import { CheckCircle, ArrowRight } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const submissionId = (location.state as any)?.submissionId;

  return (
    <div className="min-h-screen gradient-page">
      <Navbar />
      <div className="relative container-page py-32 text-center max-w-lg mx-auto overflow-hidden">
        <GeometricBackground position="both" opacity={0.08} />
        <BackButton />
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
        <h1 className="text-3xl font-semibold tracking-tight" style={{ color: '#F5F7FA' }}>Submission Received</h1>
        <p className="mt-4 leading-relaxed" style={{ color: '#A1A1AA' }}>
          Your video has been submitted for review. You will receive a breakdown video once the athlete completes the analysis.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {submissionId ? (
            <Link to={`/submission/${submissionId}`}>
              <Button className="gap-2">
                View Submission
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link to="/my-submissions">
              <Button className="gap-2">
                View My Submissions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
            Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYou;
