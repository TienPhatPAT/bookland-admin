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
    USER: {
      path: "users/*",
      to: "users",
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
