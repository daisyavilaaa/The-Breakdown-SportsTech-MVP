import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back
    </button>
  );
}
