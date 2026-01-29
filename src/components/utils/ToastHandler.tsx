"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const toastShown = useRef(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error && !toastShown.current) {
      toastShown.current = true;
      setTimeout(() => {
        toast.error(error);
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("error");
        window.history.replaceState({}, "", newUrl.toString());
      }, 100);
    }
  }, [searchParams]);

  return null;
}
