import { Navigate, RouteObject } from "react-router-dom";

import AuthFeature from "@/modules/auth";
import DashboardFeature from "@/modules/dashboard";
import DraftContainer from "@/modules/draft/DraftContainer";

import { APP_ROUTES } from "./routes";

const configAppRoutes: RouteObject[] = [
  {
    path: APP_ROUTES.LOGIN.path,
    element: <AuthFeature />,
  },
  {
    path: APP_ROUTES.DASHBOARD.path,
    element: <DashboardFeature />,
  },
  {
    path: APP_ROUTES.DRAFT.path,
    element: <DraftContainer />,
  },
  {
    path: APP_ROUTES.NOT_FOUND.path,
    element: <>404</>,
  },
  {
    path: "*",
    element: <Navigate to={APP_ROUTES.NOT_FOUND.to} replace />,
  },
];
export default configAppRoutes;
