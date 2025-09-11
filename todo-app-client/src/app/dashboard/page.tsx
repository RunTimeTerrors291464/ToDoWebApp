"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import TaskTable from "@/components/tasks/TaskTable";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user, loading, check } = useAuth();
  const router = useRouter();

  useEffect(() => { check(); }, []);
  useEffect(() => {
    if (!loading && !user) {
      // toast.error("Vui lòng đăng nhập trước khi vào Dashboard");
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="grid min-h-screen place-items-center text-gray-500">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mx-auto flex max-w-6xl gap-4 p-3">
        {/* <Sidebar /> */}
        <TaskTable />
      </div>
    </div>
  );
}
