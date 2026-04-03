import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { StatusBadge } from "@/components/StatusBadge";
import { VideoPlayer } from "@/components/VideoPlayer";
import { mockSubmissions } from "@/data/mockData";
import { Calendar, User, Target } from "lucide-react";
import { GeometricBackground } from "@/components/GeometricBackground";

const SubmissionView = () => {
  const { id } = useParams();
  const submission = mockSubmissions.find((s) => s.id === id) || mockSubmissions[0];

  return (
    <div className="min-h-screen gradient-page relative">
      <GeometricBackground position="bottom" opacity={0.06} />
      <Navbar />
      <div className="container-page py-8 max-w-3xl mx-auto">
        <BackButton />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Submission #{submission.id}</h1>
          <StatusBadge status={submission.status} />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Sport</span>
            </div>
            <p className="text-sm font-medium text-foreground">{submission.sport}</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Position</span>
            </div>
            <p className="text-sm font-medium text-foreground">{submission.position}</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Submitted</span>
            </div>
            <p className="text-sm font-medium text-foreground">{submission.dateSubmitted}</p>
          </div>
        </div>

        {/* Video */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {submission.status === "completed" ? "Breakdown Video" : "Submitted Video"}
          </h2>
          <VideoPlayer />
        </div>

        {/* Notes */}
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-3">Your Notes</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{submission.notes}</p>
        </div>

        {submission.status === "completed" && (
          <div className="p-6 rounded-lg border bg-card mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Athlete Notes</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Great footage! I focused on your catch-and-shoot mechanics from the right wing. Your base is solid but your guide hand is drifting at the release point. I've highlighted 3 key moments in the breakdown. Work on the drills I described and re-submit in 2 weeks.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SubmissionView;
