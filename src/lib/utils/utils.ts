import { clsx, type ClassValue } from "clsx"
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toastError(error: string[] | string) {
  if (Array.isArray(error)) {
    error.forEach((err) => toast.error(err));
  } else {
    toast.error(error);
  }
}