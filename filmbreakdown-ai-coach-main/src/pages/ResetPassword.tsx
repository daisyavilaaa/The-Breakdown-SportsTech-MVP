import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Film } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { GeometricBackground } from "@/components/GeometricBackground";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    // Check if this is a recovery flow from the URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }

    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({ title: "Password updated", description: "You can now sign in with your new password." });
    navigate("/login");
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen gradient-page flex items-center justify-center relative">
        <GeometricBackground position="both" opacity={0.08} />
        <div className="text-center">
          <Film className="h-8 w-8 text-primary mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-foreground">Invalid Reset Link</h1>
          <p className="text-sm text-muted-foreground mt-2">This link is invalid or has expired.</p>
          <Button className="mt-4" onClick={() => navigate("/login")}>
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-page flex items-center justify-center relative">
      <GeometricBackground position="both" opacity={0.08} />
      <div className="w-full max-w-sm">
        <BackButton />
        <div className="text-center mb-8">
          <Film className="h-8 w-8 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Set New Password</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your new password below</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4 p-6 rounded-lg border border-border bg-card">
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1.5" minLength={6} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating…" : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
