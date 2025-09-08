import React from "react";
import { cn } from "@/utils/cn";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
      )}
      {...props}
    />
  );
}
