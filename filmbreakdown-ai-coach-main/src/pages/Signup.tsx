import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Film, MailCheck } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { GeometricBackground } from "@/components/GeometricBackground";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Role = "youth_athlete" | "elite_athlete";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("youth_athlete");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("user_roles").insert({ user_id: data.user.id, role });
    }

    setLoading(false);
    setEmailSent(true);
  };

  const loginLink = redirectTo !== "/" ? `/login?redirect=${encodeURIComponent(redirectTo)}` : "/login";

  if (emailSent) {
    return (
      <div className="min-h-screen gradient-page flex items-center justify-center relative">
        <GeometricBackground position="both" opacity={0.08} />
        <div className="w-full max-w-sm text-center">
          <MailCheck className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Check your email</h1>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            We sent a verification link to <span className="text-foreground font-medium">{email}</span>. Click it to activate your account, then sign in.
          </p>
          <Link to={loginLink}>
            <Button variant="outline" className="mt-6">
              Go to Sign In
            </Button>
          </Link>
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
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join The Breakdown today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 p-6 rounded-lg border border-border bg-card">
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="mt-1.5" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="mt-1.5" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1.5" minLength={6} required />
          </div>

          <div>
            <Label className="mb-2 block">I am a…</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("youth_athlete")}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  role === "youth_athlete"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                Youth Athlete
              </button>
              <button
                type="button"
                onClick={() => setRole("elite_athlete")}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  role === "elite_athlete"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                Elite Athlete
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to={loginLink} className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
