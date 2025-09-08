"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { authSchema, AuthInput } from "@/lib/validators";
import { useAuth } from "@/lib/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { register: reg, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<AuthInput>({ resolver: zodResolver(authSchema) });
  const auth = useAuth();
  const router = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (mode === "login") {
        await auth.login(values.username, values.password);
        toast.success("Đăng nhập thành công");
      } else {
        await auth.register(values.username, values.password);
        toast.success("Đăng ký thành công");
      }
      router.push("/dashboard");
    } catch (e: any) {
      toast.error(e.message);
    }
  });

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="auth-card relative">
        <h1 className="mb-6 text-center text-xl font-bold tracking-wide">HELLO</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input placeholder="Username" {...reg("username")} />
          {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
          <Input placeholder="Password" type="password" {...reg("password")} />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {mode === "login" ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          {mode === "login" ? (
            <p>New user? <Link className="underline" href="/register">Register here</Link></p>
          ) : (
            <p>Đã có tài khoản? <Link className="underline" href="/login">Đăng nhập</Link></p>
          )}
        </div>

        {/* icon trái tim ở góc dưới trái */}
        <Heart className="absolute left-2 bottom-2 h-6 w-6 text-pink-500" />
      </div>
    </div>
  );
}
