"use client";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useTasks } from "@/lib/useTasks";
import Button from "@/components/ui/Button";
import TaskFormModal from "./TaskFormModal";
import { Priority, Status, Task } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ThumbsUp, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { STATUS_LABELS, PRIORITY_LABELS } from "@/lib/constants";

export default function TaskTable() {
  const tasks = useTasks();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [likeBurst, setLikeBurst] = useState(false);

  // Confirm delete state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Sort / Filter / Pagination state
  const [sortBy, setSortBy] = useState<
    "title" | "priority" | "status" | "createdAt"
  >("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [filterPriority, setFilterPriority] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<number | null>(null);

  // Search state
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // fetch tasks on mount + when sort/filter/page/search change
  useEffect(() => {
    tasks
      .fetch({
        page,
        limit: pageSize,
        sortBy,
        sortOrder: sortOrder.toUpperCase() as "ASC" | "DESC",
        priority: filterPriority,
        status: filterStatus,
        search,
      })
      .catch(() => toast.error("Không tải được tasks"));
  }, [page, pageSize, sortBy, sortOrder, filterPriority, filterStatus, search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1); // reset về page 1 khi search
    }, 500); // 0.5s sau khi ngừng gõ mới fetch

    return () => clearTimeout(handler);
  }, [searchInput]);

  // filter + sort in UI
  // const filtered = useMemo(() => {
  //   let data = tasks.items;

  //   if (filterPriority !== null) {
  //     data = data.filter((t) => t.priority === filterPriority);
  //   }
  //   if (filterStatus !== null) {
  //     data = data.filter((t) => t.status === filterStatus);
  //   }
  //   if (search.trim() !== "") {
  //     data = data.filter((t) =>
  //       t.title.toLowerCase().includes(search.toLowerCase())
  //     );
  //   }

  //   data = [...data].sort((a, b) => {
  //     const valA = a[sortBy];
  //     const valB = b[sortBy];
  //     if (valA < valB) return sortOrder === "asc" ? -1 : 1;
  //     if (valA > valB) return sortOrder === "asc" ? 1 : -1;
  //     return 0;
  //   });

  //   return data;
  // }, [tasks.items, sortBy, sortOrder, filterPriority, filterStatus, search]);

  // // pagination
  // const totalPages = Math.ceil(filtered.length / pageSize);
  // const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex-1 rounded-xl border bg-white p-4 shadow-sm">
      {/* Controls */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        {/* Sort + filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort by</label>
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SetStateAction<"title" | "priority" | "status" | "createdAt">)}
            >
              <option value="title">Title</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="createdAt">Created At</option>
            </select>
            <button
              className="text-sm underline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Priority</label>
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={filterPriority ?? ""}
              onChange={(e) =>
                setFilterPriority(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            >
              <option value="">All</option>
              <option value="0">None</option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
              <option value="4">Urgent</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Status</label>
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={filterStatus ?? ""}
              onChange={(e) =>
                setFilterStatus(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            >
              <option value="">All</option>
              <option value="0">Backlog</option>
              <option value="1">In Progress</option>
              <option value="2">Completed</option>
              <option value="3">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Search</label>
            <input
              type="text"
              className="border rounded-md px-2 py-1 text-sm"
              placeholder="Search title..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Add new */}
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          <span>Add new</span>
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg border">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">Priority</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Created At</th>
              <th className="px-3 py-2 w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {tasks.items.map((t) => (
                <motion.tr
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="odd:bg-white even:bg-gray-50"
                >
                  <td className="px-3 py-2">{t.title}</td>
                  <td className="px-3 py-2">{t.description || "-"}</td>
                  <td className="px-3 py-2">{PRIORITY_LABELS[t.priority]}</td>
                  <td className="px-3 py-2">{STATUS_LABELS[t.status]}</td>
                  <td className="px-3 py-2">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setEditing(t);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setTaskToDelete(t);
                          setConfirmOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                      <button
                        title="Like"
                        onClick={() => {
                          setLikeBurst(true);
                          setTimeout(() => setLikeBurst(false), 700);
                        }}
                      >
                        <Heart className="h-5 w-5 text-pink-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-3 text-sm">
        <span>
          {/* Page {page} / {totalPages || 1} */}
          Page {tasks.currentPage} / {tasks.totalPages || 1}
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Button
            variant="ghost"
            disabled={page >= tasks.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Like animation */}
      <AnimatePresence>
        {likeBurst && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 0 }}
            className="pointer-events-none fixed right-10 bottom-10 flex items-center gap-2 text-pink-500"
          >
            <span className="text-lg select-none">+1</span>
            <Heart className="h-6 w-6" />
            <ThumbsUp className="h-6 w-6 text-green-600" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task modal */}
      <TaskFormModal
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={
          editing
            ? {
                title: editing.title,
                description: editing.description,
                priority: editing.priority,
                status: editing.status,
              }
            : undefined
        }
        onSubmit={async (v) => {
          if (editing) {
            await tasks.update(String(editing.id), {
              ...v,
              priority: v.priority as Priority,
              status: v.status as Status,
            });
            toast.success("Đã cập nhật");
          } else {
            await tasks.create(v as any);
            toast.success("Đã thêm task");
          }
        }}
      />

      {/* Confirm delete modal */}
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Delete"
      >
        <p className="mb-4 text-sm text-gray-600">
          Are you sure you want to delete task{" "}
          <span className="font-semibold">{taskToDelete?.title}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (taskToDelete) {
                await tasks.remove(String(taskToDelete.id));
                toast.success("Task deleted");
              }
              setConfirmOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
