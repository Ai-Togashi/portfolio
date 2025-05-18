"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import "./globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/404");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      {/* 認証済みユーザーしか見れない管理画面 */}
      {children}
    </div>
  );
}
