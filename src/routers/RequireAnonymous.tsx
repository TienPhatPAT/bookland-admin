import { type ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/auth/useAuth";

import { APP_ROUTES } from "./routes";

type Props = {
  children: ReactElement;
};

const RequireAnonymous = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate replace to={APP_ROUTES.HOME.to} />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default RequireAnonymous;
