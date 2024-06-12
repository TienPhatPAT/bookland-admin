export const API = {
  AUTH: {
    LOGIN: "/admins/auth/login",
    LOGOUT: "/admins/auth/logout",
    REFRESH_TOKEN: "/admins/auth/refresh-access-token",
  },
  DASHBOARD: {
    PROFILE: "/admins/admins/my/profile",
    BOOK: {
      LIST: "/admins/categories",
      DETAIL: "/admins/categories",
      CREATE: "/admins/book",
      EDIT: "/admins/book",
      DELETE: "/admins/book",
    },
  },
  PUBLIC: {},
  MEDIA: {
    UPLOAD: "/medias/signed-url",
  },
};
