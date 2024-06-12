/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

import authApi from "@/services/auth.api";

import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setRoleAccountToLS,
} from "./auth";

const APIInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshingToken = false;
const failedQueue: any[] = [];

type AxiosConfig = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  data?: any;
  // Other properties specific to your configuration
};

async function refreshAccessToken() {
  const refreshToken = getRefreshTokenFromLS();
  try {
    // Make a request to the server to refresh the access token
    const response = await authApi.refreshToken({
      refreshToken,
    });

    // Retrieve the new access token from the response
    const newAccessToken = response.data.data.tokens.accessToken;
    const newRefreshToken = response.data.data.tokens.refreshToken;
    // Store the new access token in local storage
    setAccessTokenToLS(newAccessToken);
    setRefreshTokenToLS(newRefreshToken);
    setRoleAccountToLS(response.data.data.admin.role);
    return newAccessToken;
  } catch (error) {
    // Handle the error if the refresh token request fails
    clearLS();
    window.location.href = `/login`;
    throw error;
  }
}

function addToRequestQueue(config: AxiosConfig) {
  return new Promise((resolve, reject) => {
    failedQueue.push({ config, resolve, reject });
  });
}

// Function to process the request queue
function processRequestQueue(newAccessToken: string) {
  failedQueue.forEach((request) => {
    request.config.headers.Authorization = `Bearer ${newAccessToken}`;
    APIInstance(request.config).then(request.resolve).catch(request.reject);
  });
  failedQueue.length = 0; // Clear the request queue
}

// Add a request interceptor
APIInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = getAccessTokenFromLS();
    if (config.headers["noAuth"]) return config;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
APIInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    if (error.config.url.includes("refresh-access-token")) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      if (isRefreshingToken) {
        return addToRequestQueue(originalRequest);
      }
      isRefreshingToken = true;

      try {
        // Refresh the access token
        const newAccessToken = await refreshAccessToken();

        // Update the Authorization header with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        const response = APIInstance(originalRequest);

        isRefreshingToken = false;

        // Process the request queue with the new access token
        processRequestQueue(newAccessToken);

        return response;
      } catch (refreshError) {
        isRefreshingToken = false;

        // If refreshing the token fails, redirect to the login page
        return Promise.reject(refreshError);
      }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default APIInstance;
