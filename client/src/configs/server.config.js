import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const API_KEY = import.meta.env.VITE_X_API_KEY;

export const request = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

request.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("authorization");
  if (accessToken) {
    config.headers.authorization = accessToken;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Lấy các giá trị cần thiết từ storage và cookie
        const refreshToken = getCookie("refreshToken");
        const clientId = localStorage.getItem("x-client-id");
        const accessToken = localStorage.getItem("authorization");

        if (!refreshToken || !clientId) {
          throw new Error("Missing authentication data");
        }

        // Gọi API refresh token với đủ 3 headers
        const res = await request.post("v1/api/user/refreshTokenUser", null, {
          headers: {
            "x-client-id": clientId,
            "x-rtoken-id": refreshToken,
            authorization: accessToken,
          },
        });

        // Cập nhật access token mới
        const newAccessToken = res.data.metadata.tokens.accessToken;
        localStorage.setItem("authorization", newAccessToken);

        // Thử lại request ban đầu
        originalRequest.headers.Authorization = newAccessToken;
        return request(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
