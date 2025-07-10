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

// get cookie
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

request.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("authorization");
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isTokenExpired =
      error.response?.status === 500 &&
      error.response?.data?.message === "jwt expired";

    if (
      (error.response?.status === 401 || isTokenExpired) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Lấy các giá trị cần thiết từ storage và cookie
        const refreshToken = getCookie("x-rtoken-id");
        const clientId = localStorage.getItem("x-client-id");
        const accessToken = localStorage.getItem("authorization");

        if (!refreshToken) {
          localStorage.removeItem("x-client-id");
          localStorage.removeItem("authorization");
          window.location.href = "/dang-nhap";
          return Promise.reject(new Error("Refresh token not found"));
        }

        if (!clientId) {
          throw new Error("Missing client ID");
        }

        // Gọi API refresh token với đủ 3 headers
        const res = await request.post(
          "v1/api/user/refreshTokenUser",
          {},
          {
            headers: {
              "x-client-id": clientId,
              authorization: accessToken,
              "x-rtoken-id": refreshToken,
            },
            withCredentials: true,
          }
        );

        // Cập nhật access token mới
        const newAccessToken = res.data.metadata.tokens.accessToken;
        localStorage.setItem("authorization", newAccessToken);

        // Thử lại request ban đầu
        originalRequest.headers.Authorization = newAccessToken;
        return request(originalRequest);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.clear();
          window.location.href = "/login";
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
