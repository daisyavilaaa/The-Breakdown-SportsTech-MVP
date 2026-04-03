import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RouteGuardProps {
  children: ReactNode;
  requiredRole?: "youth_athlete" | "elite_athlete" | "admin";
  requireAuth?: boolean;
}

export function RouteGuard({ children, requiredRole, requireAuth = true }: RouteGuardProps) {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen gradient-page flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
