import { create } from "zustand";
import { api } from "./api";
import type { Task } from "./types";

type TasksState = {
  items: Task[];
  total: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  fetch: (params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
    priority?: number | null;
    status?: number | null;
    search?: string;
  }) => Promise<void>;
  // fetch: () => Promise<void>;
  create: (t: Omit<Task, "id" | "createdAt">) => Promise<void>;
  update: (id: string, t: Partial<Omit<Task, "id">>) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const useTasks = create<TasksState>((set, get) => ({
  items: [],
  total: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,

  fetch: async (params) => {
    set({ loading: true });
    try {
      const { data } = await api.get("/list/pagination", {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          sortBy: params.sortBy ?? "createdAt",
          sortOrder: params.sortOrder ?? "DESC",
          priority: params.priority ?? undefined,
          status: params.status ?? undefined,
          search: params.search ?? undefined,
        },
      });
      set({
        items: data.data,
        total: data.total,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  create: async (payload) => {
    const { data } = await api.post("/list/create", payload);
    set({ items: [data.data, ...get().items] });
    await get().fetch({
      page: get().currentPage,
      limit: 10, // hoặc lấy từ state nếu có
    });

    // MOCK: không gọi API, chỉ set items giả
    // const newTask: Task = {
    //   id: Date.now(),
    //   createdAt: new Date().toISOString(),
    //   ...payload,
    // } as Task;
    // set({ items: [newTask, ...get().items] });
  },

  update: async (id, payload) => {
    await api.put(`/list/edit?id=${id}`, payload);
    // backend trả {affected, raw}, không trả object task mới → cần fetch lại
    await get().fetch({
      page: get().currentPage,
      limit: 10, // hoặc lấy từ state nếu có
    });

    // MOCK: không gọi API, chỉ set items giả
    // set({
    //   items: get().items.map((t) =>
    //     String(t.id) === String(id) ? { ...t, ...payload } : t
    //   ),
    // });
  },

  remove: async (id: string) => {
    await api.delete(`/list/id?id=${id}`);
    set({ items: get().items.filter((t) => String(t.id) !== String(id)) });
    await get().fetch({
      page: get().currentPage,
      limit: 10, // hoặc lấy từ state nếu có
    });
    
    // MOCK: không gọi API, chỉ set items giả
    // set({ items: get().items.filter((t) => String(t.id) !== String(id)) });
  },
}));
