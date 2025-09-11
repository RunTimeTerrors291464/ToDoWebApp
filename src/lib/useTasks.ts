import { create } from "zustand";
import { api } from "./api";
import type { Task } from "./types";

type TasksState = {
  items: Task[];
  loading: boolean;
  fetch: () => Promise<void>;
  create: (t: Omit<Task, "id">) => Promise<void>;
  update: (id: string, t: Partial<Omit<Task, "id">>) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const useTasks = create<TasksState>((set, get) => ({
  items: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {
      //   const { data } = await api.get("/api/list/pagination?page=1&limit=20");
      //   set({ items: data.data }); // backend trả {status, message, data: [...], total, ...}
      set({
        items: [
          {
            id: 1,
            title: "Mock Task 1",
            description: "demo",
            priority: 1,
            status: 0,
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            title: "Mock Task 2",
            description: "demo",
            priority: 2,
            status: 1,
            createdAt: new Date().toISOString(),
          },
        ],
      });
    } finally {
      set({ loading: false });
    }
  },

  create: async (payload) => {
    // const { data } = await api.post("/api/list/create", payload);
    // set({ items: [data.data, ...get().items] });
    const newTask: Task = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...payload,
    } as Task;
    set({ items: [newTask, ...get().items] });
  },

  update: async (id, payload) => {
    // await api.put(`/api/list/edit?id=${id}`, payload);
    // // backend trả {affected, raw}, không trả object task mới → cần fetch lại
    // await get().fetch();
    set({
      items: get().items.map((t) =>
        String(t.id) === String(id) ? { ...t, ...payload } : t
      ),
    });
  },

  remove: async (id: string) => {
    // await api.delete(`/api/list/id?id=${id}`);
    // set({ items: get().items.filter((t) => String(t.id) !== String(id)) });
    set({ items: get().items.filter((t) => String(t.id) !== String(id)) });
  },
}));
