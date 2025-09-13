"use client";
import { useAuth } from "@/lib/useAuth";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { UserCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-2">
      {/* Logo bên trái */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/dashboard")}>
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-lg">TodoApp</span>
      </div>

      {/* User + Logout bên phải */}
      <div className="flex items-center gap-3">
        <UserCircle2 />
        <span className="text-sm">{user?.username}</span>
        <Button
          variant="ghost"
          onClick={async () => {
            await logout();
            toast.success("Đã đăng xuất");
            router.replace("/login");
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}