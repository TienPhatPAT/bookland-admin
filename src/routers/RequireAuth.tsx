import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { APP_ROUTES } from "@/routers/routes";

import useAuth from "@/hooks/auth/useAuth";

interface RequireAuthProps {
  children: ReactElement;
  redirectTo?: string;
}

function RequireAuth({ children, redirectTo = APP_ROUTES.LOGIN.to }: RequireAuthProps) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate replace to={redirectTo} />;

  return <>{children ? children : <Outlet />}</>;
}

export default RequireAuth;
