import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Film } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { GeometricBackground } from "@/components/GeometricBackground";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Check role for smart redirect
    let destination = redirectTo;
    if (redirectTo === "/") {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", (await supabase.auth.getUser()).data.user!.id)
        .limit(1)
        .single();
      if (roleData?.role === "elite_athlete") {
        destination = "/portal";
      }
    }

    toast({ title: "Welcome back!" });
    navigate(destination);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        title: "Enter your email",
        description: "Type your email address above, then click forgot password.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We sent you a password reset link." });
    }
  };

  const signupLink = redirectTo !== "/" ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : "/signup";

  return (
    <div className="min-h-screen gradient-page flex items-center justify-center relative">
      <GeometricBackground position="both" opacity={0.08} />
      <div className="w-full max-w-sm">
        <BackButton />
        <div className="text-center mb-8">
          <Film className="h-8 w-8 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Sign In</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back to The Breakdown</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 p-6 rounded-lg border border-border bg-card">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="mt-1.5" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1.5" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
          <div className="flex items-center justify-between text-sm">
            <button type="button" onClick={handleForgotPassword} className="text-primary hover:underline">
              Forgot password?
            </button>
            <Link to={signupLink} className="text-primary hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
