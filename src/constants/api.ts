export const API = {
  AUTH: {
    LOGIN: "/admins/auth/login",
    LOGOUT: "/admins/auth/logout",
    REFRESH_TOKEN: "/admins/auth/refresh-access-token",
  },
  DASHBOARD: {
    PROFILE: "/admins/admins/my/profile",
    BOOK: {
      LIST: "/Sach/list",
      CREATE: "Sach/add",
      EDIT: "/Sach/edit",
      DELETE: "/Sach/delete",
    },
    TAC_GIA: {
      LIST: "/tacgia/list",
      CREATE: "/tacgia/add",
      EDIT: "/tacgia/edit",
    },
  },
  PUBLIC: {},
  MEDIA: {
    UPLOAD: "/medias/signed-url",
  },
};
