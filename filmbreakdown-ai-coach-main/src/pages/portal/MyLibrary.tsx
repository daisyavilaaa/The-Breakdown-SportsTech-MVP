import { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Upload, Play, Trash2, CheckCircle, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useAthleteLibrary, useUploadLibraryVideo, useDeleteLibraryVideo } from "@/hooks/useLibraryVideos";
import { getSkillCategories } from "@/data/skillCategories";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { GeometricBackground } from "@/components/GeometricBackground";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const MyLibrary = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("elite_profiles").select("*").eq("user_id", user.id).single().then(({ data }) => setProfile(data));
  }, [user]);

  const athleteId = profile?.id || "";
  const sport = profile?.sport || "Football";
  const { data: videos = [], isLoading } = useAthleteLibrary(athleteId);
  const uploadMutation = useUploadLibraryVideo();
  const deleteMutation = useDeleteLibraryVideo();

  const [showUpload, setShowUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const categories = getSkillCategories(sport);

  const filteredVideos = filterCategory ? videos.filter((v) => v.skill_category === filterCategory) : videos;

  const resetForm = () => { setUploadFile(null); setTitle(""); setSelectedCategory(""); };

  const handleUpload = async () => {
    if (!uploadFile || !title.trim() || !selectedCategory || !athleteId) return;
    try {
      await uploadMutation.mutateAsync({ file: uploadFile, title: title.trim(), skillCategory: selectedCategory, athleteId, sport });
      toast.success("Video added to your library");
      resetForm();
      setShowUpload(false);
    } catch {
      toast.error("Upload failed. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync({ id, athleteId });
      toast.success("Video removed");
    } catch {
      toast.error("Failed to delete video");
    }
  };

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) setUploadFile(file);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadFile(file);
  }, []);

  if (authLoading) return <div className="min-h-screen gradient-page flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading…</p></div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen gradient-page relative">
      <GeometricBackground position="bottom" opacity={0.06} />
      <header className="h-14 bg-transparent backdrop-blur-xl flex items-center justify-between px-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-4">
          <Link to="/portal" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg text-foreground tracking-tight">The Breakdown</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">Athlete Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/portal" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">Requests</Link>
          <Link to="/portal/library" className="text-sm text-foreground font-medium">My Library</Link>
          <Link to="/portal/profile" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-150">
            <span className="text-sm text-muted-foreground">{profile?.full_name || user.email}</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">My Library</h1>
            <p className="text-sm text-muted-foreground">Upload and manage your personal training videos and drills.</p>
          </div>
          <Button onClick={() => setShowUpload(true)} className="gap-2 h-9">
            <Upload className="h-4 w-4" />
            Upload Video
          </Button>
        </div>

        {videos.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setFilterCategory(null)} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150", !filterCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground")}>All</button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilterCategory(cat === filterCategory ? null : cat)} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150", filterCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground")}>{cat}</button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="aspect-video rounded-lg bg-secondary animate-pulse" />)}
          </div>
        ) : filteredVideos.length === 0 && videos.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border rounded-lg">
            <Film className="h-10 w-10 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-foreground font-medium text-sm mb-1">Your library is empty.</p>
            <p className="text-muted-foreground text-xs mb-5">Upload your first training video to start building your personal library.</p>
            <Button onClick={() => setShowUpload(true)} size="sm" className="gap-2"><Upload className="h-3.5 w-3.5" />Upload Video</Button>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-20"><p className="text-muted-foreground text-sm">No videos in this category.</p></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredVideos.map((video) => (
              <div key={video.id} className="group rounded-lg border border-border bg-card overflow-hidden">
                <div className="aspect-video relative bg-secondary flex items-center justify-center">
                  {video.thumbnail_url ? <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" /> : <Play className="h-8 w-8 text-muted-foreground/40" />}
                </div>
                <div className="p-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2">{video.title}</h3>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-muted-foreground">{video.skill_category}</span>
                  </div>
                  <button onClick={() => handleDelete(video.id)} className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-150 flex-shrink-0 opacity-0 group-hover:opacity-100" title="Delete video">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog open={showUpload} onOpenChange={(open) => { if (!open) { resetForm(); setShowUpload(false); } }}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">Upload to Library</DialogTitle></DialogHeader>
          <div className="space-y-5 pt-2">
            <div onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop} className={cn("relative border-2 border-dashed rounded-lg p-6 text-center transition-colors", uploadFile ? "border-primary/30 bg-primary/5" : "border-border hover:border-primary/50 hover:bg-primary/5")}>
              {uploadFile ? (
                <div>
                  <CheckCircle className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium text-foreground">{uploadFile.name}</p>
                  <button onClick={() => setUploadFile(null)} className="text-xs text-primary mt-2 hover:underline">Choose different file</button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-foreground mb-1">Drop your video here or click to browse</p>
                  <p className="text-xs text-muted-foreground">MP4, MOV, or AVI</p>
                  <input type="file" accept="video/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Title or explanation</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Explain what this video teaches" className="bg-secondary border-border text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Skill category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150", selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground")}>{cat}</button>
                ))}
              </div>
            </div>
            <Button onClick={handleUpload} disabled={!uploadFile || !title.trim() || !selectedCategory || uploadMutation.isPending} className="w-full gap-2">
              {uploadMutation.isPending ? "Uploading..." : "Upload to Library"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyLibrary;
