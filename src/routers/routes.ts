export const APP_ROUTES = {
  HOME: {
    path: "/*",
    to: "/",
  },
  DASHBOARD: {
    path: "/*",
    CATEGORY: {
      path: "books/*",
      to: "books",
    },
  },
  LOGIN: {
    path: "login/*",
    to: "/login",
  },
  DRAFT: {
    path: "draft/*",
    to: "/draft",
  },
  NOT_FOUND: {
    path: "404",
    to: "/404",
  },
};
