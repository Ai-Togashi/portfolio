"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      const tokenResult = await user.getIdTokenResult();
      if (tokenResult.claims.admin) {
        setIsAdmin(true);
      } else {
        router.push("/admin/login");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-600">認証確認中...</p>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-white px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-10">
          管理者ダッシュボード
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* 📬 お問い合わせ一覧 */}
          <Link
            href="/admin/inquiries"
            className="flex flex-col items-center justify-center bg-gradient-to-r from-green-300 to-blue-300 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition p-8"
          >
            <div className="text-5xl mb-3">📬</div>
            <h2 className="text-lg">お問い合わせ一覧</h2>
          </Link>

          {/* 📝 トップページコンテンツ管理 */}
          <Link
            href="/admin/contents"
            className="flex flex-col items-center justify-center bg-gradient-to-r from-green-300 to-blue-300 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition p-8"
          >
            <div className="text-5xl mb-3">📝</div>
            <h2 className="text-lg">トップページコンテンツ管理</h2>
          </Link>

          {/* 🖼️ 画像アップロード・管理 */}
          <Link
            href="/admin/images"
            className="flex flex-col items-center justify-center bg-gradient-to-r from-green-300 to-blue-300 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition p-8"
          >
            <div className="text-5xl mb-3">🖼️</div>
            <h2 className="text-lg">画像アップロード・管理</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}
