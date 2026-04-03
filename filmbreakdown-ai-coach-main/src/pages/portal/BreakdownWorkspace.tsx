import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play, Pause, SkipBack, SkipForward,
  ArrowLeft, User, Video,
  ZoomIn, Highlighter, Pencil, Trash2,
  ChevronDown, ChevronRight, Crosshair, MessageSquareQuote, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type RecordingState = "idle" | "recording" | "preview";
type Tool = "zoom" | "highlight" | "draw" | null;

const BreakdownWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userRole, loading: authLoading } = useAuth();

  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [speed, setSpeed] = useState("1x");
  const [elapsed, setElapsed] = useState(0);
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const [diagnosisExpanded, setDiagnosisExpanded] = useState(false);
  const [originalExpanded, setOriginalExpanded] = useState(false);

  const tools = [
    { id: "zoom" as Tool, icon: ZoomIn, label: "Zoom" },
    { id: "highlight" as Tool, icon: Highlighter, label: "Highlight" },
    { id: "draw" as Tool, icon: Pencil, label: "Draw" },
  ];

  const speeds = ["0.5x", "1x"];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!id || !user) return;
    const load = async () => {
      const { data } = await supabase
        .from("submissions")
        .select("*")
        .eq("id", id)
        .single();
      setSubmission(data);
      setLoading(false);
    };
    load();
  }, [id, user]);

  useEffect(() => {
    if (recordingState !== "recording") return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [recordingState]);

  const handleStartRecording = () => {
    setRecordingState("recording");
    setElapsed(0);
  };

  const handleStopRecording = () => setRecordingState("preview");
  const handleReRecord = () => { setRecordingState("idle"); setElapsed(0); };

  const handleSubmit = async () => {
    if (!submission || !user) return;
    try {
      // Get elite profile
      const { data: ep } = await supabase
        .from("elite_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (ep) {
        await supabase.from("breakdowns").insert({
          submission_id: submission.id,
          athlete_id: ep.id,
          status: "completed",
          notes: "Breakdown completed",
        });

        await supabase.from("submissions").update({ status: "completed" }).eq("id", submission.id);
      }
      toast.success("Breakdown submitted!");
      navigate("/portal");
    } catch {
      toast.error("Failed to submit breakdown.");
    }
  };

  if (authLoading) {
    return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading…</p></div>;
  }
  if (!user) return <Navigate to="/login" replace />;

  if (loading) {
    return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading submission…</p></div>;
  }

  if (!submission) {
    return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Submission not found.</p></div>;
  }

  const summary = submission.edited_summary || submission.generated_summary;

  return (
    <div className="min-h-screen gradient-page flex flex-col">
      <div className="h-12 bg-transparent backdrop-blur-xl flex items-center justify-between px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link to="/portal" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Video className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Breakdown Studio</span>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          {submission.name || "Anonymous"} · {submission.position_event}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left — Video Player */}
        <div className="flex-1 flex flex-col p-5">
          <div className="flex-1 relative bg-black rounded-lg overflow-hidden border border-border">
            {submission.video_url ? (
              <video src={submission.video_url} className="absolute inset-0 w-full h-full object-contain" controls />
            ) : (
              <>
                <div className="absolute inset-0 bg-secondary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    {recordingState === "preview" ? "Recording preview — review your breakdown" : "No video uploaded"}
                  </p>
                </div>
              </>
            )}

            {recordingState === "recording" && (
              <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full border-2 border-primary/60 overflow-hidden bg-secondary">
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {/* Annotation Tools */}
          <div className="flex items-center gap-1 mt-3 mb-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-colors duration-150",
                  activeTool === tool.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tool.icon className="h-3.5 w-3.5" />
                {tool.label}
              </button>
            ))}
            {activeTool && (
              <button onClick={() => setActiveTool(null)} className="text-muted-foreground hover:text-foreground transition-colors duration-150 ml-1 px-2 py-1.5" title="Clear tool">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Video Controls */}
          <div className="mt-2">
            <div className="h-1 bg-border rounded-full mb-4 relative cursor-pointer">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: "35%" }} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="text-muted-foreground hover:text-foreground transition-colors duration-150"><SkipBack className="h-4 w-4" /></button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  {isPlaying ? <Pause className="h-3.5 w-3.5 text-primary-foreground" /> : <Play className="h-3.5 w-3.5 text-primary-foreground ml-0.5" />}
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors duration-150"><SkipForward className="h-4 w-4" /></button>
              </div>
              <div className="flex items-center gap-1">
                {speeds.map((s) => (
                  <button key={s} onClick={() => setSpeed(s)} className={cn("px-2.5 py-1 rounded-md text-xs font-mono transition-colors duration-150", speed === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Info Panel */}
        <div className="w-80 border-l border-border p-5 overflow-y-auto flex flex-col gap-5">
          <h2 className="text-base font-semibold text-foreground leading-tight tracking-tight">
            {submission.skill_area} — {submission.position_event}
          </h2>

          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">{submission.issue_context}</p>
          </div>

          {summary && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Crosshair className="h-3.5 w-3.5 text-primary" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">AI Summary</h3>
              </div>
              {summary.primaryFocus && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {summary.primaryFocus.map((f: string) => (
                    <span key={f} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">{f}</span>
                  ))}
                </div>
              )}
              {summary.userConcern && <p className="text-sm text-muted-foreground">{summary.userConcern}</p>}
            </div>
          )}

          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Athlete</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground">{submission.name || "Anonymous"}</span>
              <span className="text-muted-foreground">Age</span>
              <span className="text-foreground">{submission.age}</span>
              <span className="text-muted-foreground">Position</span>
              <span className="text-foreground">{submission.position_event}</span>
              <span className="text-muted-foreground">Focus</span>
              <span className="text-foreground">{submission.skill_area}</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <button onClick={() => setOriginalExpanded(!originalExpanded)} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 w-full">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              <span className="font-semibold uppercase tracking-wide">Original Input</span>
              {originalExpanded ? <ChevronDown className="h-3 w-3 ml-auto" /> : <ChevronRight className="h-3 w-3 ml-auto" />}
            </button>
            <AnimatePresence>
              {originalExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <p className="text-xs text-foreground leading-relaxed mt-3 bg-secondary rounded-md p-3 border border-border italic">"{submission.issue_context}"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <Badge variant="secondary" className="text-[10px] font-normal">{submission.sport}</Badge>
          </div>

          <div className="flex-1" />

          {/* Recording Controls */}
          <div className="space-y-3 border-t border-border pt-4">
            {recordingState === "idle" && (
              <Button onClick={handleStartRecording} className="w-full gap-2 h-10">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
                Start Breakdown
              </Button>
            )}
            {recordingState === "recording" && (
              <>
                <div className="flex items-center justify-center gap-2 py-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
                  <span className="font-mono text-sm text-foreground">Recording · {formatTime(elapsed)}</span>
                </div>
                <Button onClick={handleStopRecording} variant="destructive" className="w-full h-10">Stop Recording</Button>
              </>
            )}
            {recordingState === "preview" && (
              <>
                <p className="text-center text-sm text-muted-foreground">Review your breakdown</p>
                <div className="flex gap-2">
                  <Button onClick={handleReRecord} variant="outline" className="flex-1">Re-record</Button>
                  <Button onClick={handleSubmit} className="flex-1">Submit Breakdown</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakdownWorkspace;
