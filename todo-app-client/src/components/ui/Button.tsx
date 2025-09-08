import { cn } from "@/utils/cn"; // tạo helper bên dưới
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };
export default function Button({ className, variant="primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "rounded-xl px-4 py-2 text-sm font-medium transition shadow-sm",
        variant === "primary" && "bg-gray-900 text-white hover:opacity-90",
        variant === "ghost" && "bg-transparent hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}
