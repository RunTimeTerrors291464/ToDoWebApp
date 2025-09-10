import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // nhận & gửi cookie nếu backend đặt httpOnly
});

// optional: interceptor báo lỗi gọn
api.interceptors.response.use(
  (r) => r,
  (err) => {
    console.log("API ERROR:", err);
    
    const msg = err?.response?.message || "Có lỗi xảy ra";
    return Promise.reject(new Error(msg));
  }
);
