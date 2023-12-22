import axios from "axios";
import { store } from "../store";
import { refreshToken } from "../store/account/actions";
import { UrlConstants } from "../constants/urlConstants";

const api = axios.create({
  withCredentials: true,
  baseURL: UrlConstants.BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Check if the request to logout or refresh token
    if (
      (config.url === "/auth/logout" &&
        config.method.toLowerCase() === "delete") ||
      (config.url === "/auth/token" &&
        config.method.toLowerCase() === "post") ||
      (config.url === "/auth/login" && config.method.toLowerCase() === "post")
    )
      return config;

    console.log(config.method, config.url);
    // Check if the token is expired
    const expiredAt = store.getState().account?.auth?.expiredAt;
    if (expiredAt && new Date(expiredAt) < new Date()) {
      // Token is expired, perform the necessary actions (e.g., refresh token or logout)
      // You might redirect to the login page or trigger a token refresh here
      await store.dispatch(refreshToken());
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
    }
    return Promise.reject(err);
  }
);

export { api };
