import { ReactElement } from "react";
import { getRoleAccountFromLS } from "@/utils/auth";
import { Navigate, Outlet } from "react-router-dom";

import { APP_ROUTES } from "./routes";

interface RequireRoleProps {
  children: ReactElement;
  roles: string[];
  redirectTo?: string;
}

function RequireRole({ children, roles, redirectTo = APP_ROUTES.HOME.to }: RequireRoleProps) {
  const currentRole = getRoleAccountFromLS();

  if (!roles.includes(currentRole)) return <Navigate replace to={redirectTo} />;

  return <>{children ? children : <Outlet />}</>;
}

export default RequireRole;
