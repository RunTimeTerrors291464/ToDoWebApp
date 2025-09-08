import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = { title: "Todo App", description: "Next.js To-do" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}