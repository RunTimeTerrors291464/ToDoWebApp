import { create } from "zustand";
// import { api } from "./api";

type User = { username: string } | null;

type AuthState = {
  user: User;
  loading: boolean;
  check: () => Promise<void>;
  login: (u: string, p: string) => Promise<void>;
  register: (u: string, p: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  loading: false,

//   check: async () => {
//     set({ loading: true });
//     try {
//       const { data } = await api.get("/auth/me");
//       set({ user: data || null });
//     } catch {
//       set({ user: null });
//     } finally {
//       set({ loading: false });
//     }
//   },

  check: async () => {
    // 🚧 MOCK: không gọi API, chỉ set loading=false
    set({ loading: true });
    // giả lập delay 200ms để giống thật
    await new Promise((res) => setTimeout(res, 200));
    // giữ nguyên user đang có
    set({ loading: false, user: get().user });
  },

  login: async (username, password) => {
    // const { data } = await api.post("/api/auth/login", { username, password });
    // set({ user: data.data }); // lấy user từ response
    set({ user: { username } });
  },

  register: async (username, password) => {
    // const { data } = await api.post("/api/auth/register", {
    //   username,
    //   password,
    // });
    // set({ user: data.data.user }); // backend trả {user: {...}}
    set({ user: { username } });
  },

  logout: async () => {
    // backend không có /api/auth/logout
    // chỉ cần xoá cookie phía client => với httpOnly thì chỉ có cách gọi API clear cookie (nếu backend support),
    // ở đây ta giả sử logout = set user=null
    set({ user: null });
  },
}));
function get() {
    throw new Error("Function not implemented.");
}

