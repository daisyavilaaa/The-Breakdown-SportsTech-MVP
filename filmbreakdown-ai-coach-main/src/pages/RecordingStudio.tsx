import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockSubmissions } from "@/data/mockData";
import {
  Play, Pause, SkipBack, SkipForward,
  Circle, ArrowUpRight, Pencil, Highlighter, Trash2,
  Video, User, Sparkles, Target, ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tool = "circle" | "arrow" | "draw" | "highlight" | null;

const RecordingStudio = () => {
  const { id } = useParams();
  const submission = mockSubmissions.find((s) => s.id === id) || mockSubmissions[0];
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const [speed, setSpeed] = useState("1x");
  const [elapsed, setElapsed] = useState(0);

  const tools = [
    { id: "circle" as Tool, icon: Circle, label: "Highlight" },
    { id: "arrow" as Tool, icon: ArrowUpRight, label: "Direction" },
    { id: "draw" as Tool, icon: Pencil, label: "Draw" },
    { id: "highlight" as Tool, icon: Highlighter, label: "Area" },
  ];

  const speeds = ["1x", "0.5x", "0.25x"];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useState(() => {
    if (!isRecording) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="min-h-screen gradient-page flex flex-col">
      <div className="h-12 bg-transparent backdrop-blur-xl flex items-center justify-between px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link to={`/admin/submissions/${submission.id}`} className="flex items-center gap-2 studio-muted hover:studio-text transition-colors duration-150">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to review</span>
        </Link>
        <div className="flex items-center gap-2">
          <Video className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium studio-text">Recording Studio</span>
        </div>
        <div className="text-sm studio-muted font-mono">{submission.customerName} · {submission.sport}</div>
      </div>

      <div className="flex-1 flex">
        <div className="w-72 border-r studio-border p-5 space-y-6 overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 studio-muted" />
              <h3 className="text-xs font-semibold studio-text uppercase tracking-wide">Athlete Info</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="studio-muted">Name</span>
                <span className="studio-text">{submission.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="studio-muted">Sport</span>
                <span className="studio-text">{submission.sport}</span>
              </div>
              <div className="flex justify-between">
                <span className="studio-muted">Position</span>
                <span className="studio-text">{submission.position}</span>
              </div>
            </div>
          </div>

          {submission.aiSummary && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-semibold studio-text uppercase tracking-wide">AI Summary</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs studio-muted mb-1">Focus Areas</p>
                  <div className="flex flex-wrap gap-1">
                    {submission.aiSummary.primaryFocus.map((f) => (
                      <span key={f} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">{f}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs studio-muted mb-1">Concern</p>
                  <p className="studio-text text-sm">{submission.aiSummary.userConcern}</p>
                </div>
                <div>
                  <p className="text-xs studio-muted mb-1">Key Question</p>
                  <p className="studio-text text-sm">{submission.aiSummary.keyQuestion}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 studio-muted" />
              <h3 className="text-xs font-semibold studio-text uppercase tracking-wide">Notes</h3>
            </div>
            <p className="text-sm studio-muted leading-relaxed">{submission.notes}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
          <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden border border-border relative">
            <div className="absolute inset-0 bg-secondary/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm studio-muted">Video canvas — uploaded footage plays here</p>
            </div>

            {isRecording && (
              <div className="absolute bottom-4 right-4 w-28 h-28 rounded-full border-2 border-primary/60 overflow-hidden bg-secondary">
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-8 w-8 studio-muted" />
                </div>
              </div>
            )}
          </div>

          <div className="w-full max-w-4xl mt-4">
            <div className="h-1 bg-border rounded-full mb-4 relative">
              <div className="h-full bg-primary rounded-full" style={{ width: "35%" }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="studio-muted hover:studio-text transition-colors duration-150">
                  <SkipBack className="h-4 w-4" />
                </button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  {isPlaying ? <Pause className="h-3.5 w-3.5 text-primary-foreground" /> : <Play className="h-3.5 w-3.5 text-primary-foreground ml-0.5" />}
                </button>
                <button className="studio-muted hover:studio-text transition-colors duration-150">
                  <SkipForward className="h-4 w-4" />
                </button>
                <span className="font-mono text-xs studio-muted ml-2">01:24 / 03:45</span>
              </div>

              <div className="flex items-center gap-1">
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-mono transition-colors duration-150",
                      speed === s ? "bg-primary text-primary-foreground" : "studio-muted hover:studio-text"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 studio-surface px-6 py-3 rounded-lg border studio-border shadow-2xl backdrop-blur-md">
        {isRecording && (
          <div className="flex items-center gap-2 pr-4 border-r studio-border">
            <div className="w-2.5 h-2.5 rounded-full bg-record animate-pulse-record" />
            <span className="font-mono text-sm studio-text">{formatTime(elapsed)}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-colors duration-150",
                activeTool === tool.id ? "bg-primary text-primary-foreground" : "studio-muted hover:studio-text"
              )}
              title={tool.label}
            >
              <tool.icon className="h-4 w-4 stroke-[1.5px]" />
              <span>{tool.label}</span>
            </button>
          ))}

          <div className="w-px h-4 studio-border" />

          <button onClick={() => setActiveTool(null)} className="studio-muted hover:studio-text transition-colors duration-150" title="Clear">
            <Trash2 className="h-4 w-4 stroke-[1.5px]" />
          </button>
        </div>

        <div className="ml-2">
          {!isRecording ? (
            <Button onClick={() => setIsRecording(true)} className="rounded-md px-6 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
              Start Recording
            </Button>
          ) : (
            <Button onClick={() => setIsRecording(false)} variant="destructive" className="rounded-md px-6">
              Finish & Export
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordingStudio;
