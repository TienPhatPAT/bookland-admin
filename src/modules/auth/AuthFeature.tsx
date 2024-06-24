import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import { APP_ROUTES } from "@/routers/routes";

import { AuthLayout } from "@/components/layout";

import { Login } from "./login";

const configAuthRoutes: RouteObject[] = [
  {
    path: "*",
    element: (
      // <RequireAnonymous>
      <AuthLayout />
      // </RequireAnonymous>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "*",
        element: <Navigate to={APP_ROUTES.LOGIN.to} replace />,
      },
    ],
  },
];
function AuthFeature() {
  return useRoutes(configAuthRoutes);
}

export default AuthFeature;
