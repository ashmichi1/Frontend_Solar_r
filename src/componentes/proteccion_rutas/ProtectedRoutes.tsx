import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../helpers/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: number[]; // Ej: [1, 2]
}

export function ProtectedRoutes({ children, roles = [] }: ProtectedRouteProps) {
  const user = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (roles.length > 0 && !roles.includes(user.role))
    return <Navigate to="/unauthorized" />;

  return <>{children}</>;
}
