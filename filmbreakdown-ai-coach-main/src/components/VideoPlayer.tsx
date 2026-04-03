import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  className?: string;
  thumbnail?: string;
  showPlayButton?: boolean;
}

export function VideoPlayer({ className, thumbnail, showPlayButton = true }: VideoPlayerProps) {
  return (
    <div className={cn("relative bg-black rounded-lg overflow-hidden border border-border aspect-video group", className)}>
      {thumbnail && (
        <img src={thumbnail} alt="Video" className="absolute inset-0 w-full h-full object-cover" />
      )}
      {!thumbnail && (
        <div className="absolute inset-0 bg-secondary/40" />
      )}
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-150">
          <div className="w-14 h-14 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
            <Play className="h-6 w-6 text-primary fill-primary ml-0.5" />
          </div>
        </div>
      )}
    </div>
  );
}
