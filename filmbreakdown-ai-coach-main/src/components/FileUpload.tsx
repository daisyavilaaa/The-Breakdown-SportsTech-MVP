import { useState, useCallback } from "react";
import { Upload, Film, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

type UploadState = "idle" | "validating" | "uploading" | "success" | "error";

interface FileUploadProps {
  onUploadComplete?: (url: string) => void;
  bucket?: string;
}

export function FileUpload({ onUploadComplete, bucket = "submission-videos" }: FileUploadProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error("Could not read video file"));
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const uploadFile = useCallback(async (file: File) => {
    setFileName(file.name);
    setErrorMessage("");
    setState("validating");

    // Validate duration
    try {
      const duration = await validateDuration(file);
      if (duration > 30) {
        setState("error");
        setErrorMessage(`Clip is ${Math.round(duration)}s — maximum is 30 seconds.`);
        return;
      }
    } catch {
      setState("error");
      setErrorMessage("Could not read video duration. Please try a different file.");
      return;
    }

    // Upload to storage
    setState("uploading");
    setProgress(0);

    const fileExt = file.name.split(".").pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    // Simulate progress since Supabase JS doesn't expose upload progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 12, 90));
    }, 300);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { contentType: file.type });

    clearInterval(progressInterval);

    if (error) {
      setState("error");
      setErrorMessage(error.message);
      return;
    }

    setProgress(100);
    setState("success");

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    onUploadComplete?.(urlData.publicUrl);
  }, [bucket, onUploadComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const reset = () => {
    setState("idle");
    setProgress(0);
    setErrorMessage("");
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        state === "idle" && "border-border hover:border-primary/50 hover:bg-primary/5",
        state === "validating" && "border-primary/30 bg-primary/5",
        state === "uploading" && "border-primary/30 bg-primary/5",
        state === "success" && "border-success/30 bg-success/5",
        state === "error" && "border-destructive/30 bg-destructive/5",
      )}
    >
      {state === "idle" && (
        <>
          <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <p className="text-sm font-medium text-foreground mb-1">Drop your video here or click to browse</p>
          <p className="text-xs text-muted-foreground">MP4, MOV, or AVI — Max 30 seconds</p>
          <input
            type="file"
            accept="video/*"
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </>
      )}

      {state === "validating" && (
        <>
          <Film className="h-10 w-10 mx-auto text-primary mb-4 animate-pulse" />
          <p className="text-sm font-medium text-foreground mb-1">Checking video duration…</p>
        </>
      )}

      {state === "uploading" && (
        <>
          <Film className="h-10 w-10 mx-auto text-primary mb-4" />
          <p className="text-sm font-medium text-foreground mb-1">{fileName}</p>
          <Progress value={Math.min(progress, 100)} className="h-1 mt-3 max-w-xs mx-auto" />
          <p className="text-xs text-muted-foreground mt-2">{Math.min(Math.round(progress), 100)}% uploaded</p>
        </>
      )}

      {state === "success" && (
        <>
          <CheckCircle className="h-10 w-10 mx-auto text-success mb-4" />
          <p className="text-sm font-medium text-foreground mb-1">Upload complete</p>
          <p className="text-xs text-muted-foreground">{fileName}</p>
          <button onClick={reset} className="text-xs text-primary mt-3 hover:underline">
            Upload a different file
          </button>
        </>
      )}

      {state === "error" && (
        <>
          <AlertCircle className="h-10 w-10 mx-auto text-destructive mb-4" />
          <p className="text-sm font-medium text-foreground mb-1">Upload failed</p>
          <p className="text-xs text-muted-foreground">{errorMessage || "Please try again"}</p>
          <button onClick={reset} className="text-xs text-primary mt-3 hover:underline">
            Try again
          </button>
        </>
      )}
    </div>
  );
}
