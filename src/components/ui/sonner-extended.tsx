import { cn } from "@/lib/utils";
import React from "react";
import { toast as toastSonner } from "sonner";
type messageType = Parameters<typeof toastSonner>[0];
type dataType = Parameters<typeof toastSonner>[1] & {
  type?: "success" | "error" | "warning" | "info";
};

export function showToast(message: messageType, data?: dataType) {
  const dataWithoutType = { ...data, type: undefined };
  return toastSonner(message, {
    ...dataWithoutType,
    className: cn(
      "dark:bg-black dark:text-white border-white/20",
      data?.type === "success"
        ? "bg-green-500/30 dark:bg-green-500/30 backdrop-blur-sm"
        : data?.type === "error"
        ? "bg-red-500/30 dark:bg-red-500/30 backdrop-blur-sm"
        : data?.type === "warning"
        ? "bg-yellow-500/30 dark:bg-yellow-500/30 backdrop-blur-sm"
        : data?.type === "info"
        ? "bg-blue-500/30 dark:bg-blue-500/30 backdrop-blur-sm"
        : "bg-gray-500/30 dark:bg-gray-500/30 backdrop-blur-sm"
    ),
  });
}
