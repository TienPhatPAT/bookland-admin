import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import { APP_ROUTES } from "@/routers/routes";

import { DashboardLayout } from "@/components/layout";

import Books from "./books";
import Users from "./users";

// create new page
const configRoutes: RouteObject[] = [
  {
    element: (
      // <RequireAuth>
      <DashboardLayout />
      // </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={APP_ROUTES.DASHBOARD.CATEGORY.to} replace />,
      },
      {
        path: APP_ROUTES.DASHBOARD.CATEGORY.path,
        element: (
          // <RequireRole roles={[ERoleAccount.SUPPER_ADMIN, ERoleAccount.ADMIN]}>
          <Books />
          // </RequireRole>
        ),
      },
      {
        path: APP_ROUTES.DASHBOARD.USER.path,
        element: <Users />,
      },
      {
        path: "*",
        element: <Navigate to={APP_ROUTES.NOT_FOUND.to} replace />,
      },
    ],
  },
];

const DashboardFeature = () => {
  const routes = useRoutes(configRoutes);
  return <>{routes}</>;
};

export default DashboardFeature;
