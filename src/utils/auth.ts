import { ACCESS_TOKEN, REFRESH_TOKEN, ROLE_ACCOUNT } from "@/constants/auth";

export const clearLS = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(ROLE_ACCOUNT);
};
export const getAccessTokenFromLS = () => localStorage.getItem(ACCESS_TOKEN) || "";

export const getRefreshTokenFromLS = () => localStorage.getItem(REFRESH_TOKEN) || "";

export const getRoleAccountFromLS = () => localStorage.getItem(ROLE_ACCOUNT) || "";

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem(ACCESS_TOKEN, access_token);
};

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem(REFRESH_TOKEN, refresh_token);
};

export const setRoleAccountToLS = (role: string) => {
  localStorage.setItem(ROLE_ACCOUNT, role);
};
