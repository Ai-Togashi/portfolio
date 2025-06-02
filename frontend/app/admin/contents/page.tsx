"use client";

import { useState, useEffect } from "react";
import { useContents, Content } from "@/hooks/useContents";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminContentsPage() {
  const router = useRouter();
  const { contents, error, fetchContents } = useContents();
  const [editContent, setEditContent] = useState<Content | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        toast.error("ログインしてください");
        router.push("/admin/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleEditClick = (content: Content) => setEditContent(content);

  const handleSave = async () => {
    if (!editContent) return;
    if (!editContent.title.trim() || !editContent.description.trim()) {
      toast.error("タイトルと説明文は必須です");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contents/${editContent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editContent),
      });

      if (!res.ok) throw new Error("更新失敗");
      toast.success("更新しました！");
      setEditContent(null);
      await fetchContents();
    } catch (err) {
      console.error(err);
      toast.error("保存エラーが発生しました");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">トップページコンテンツ管理</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">タイトル</th>
            <th className="border px-4 py-2">説明文</th>
            <th className="border px-4 py-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content) => (
            <tr key={content.id} className={editContent?.id === content.id ? "bg-yellow-50" : ""}>
              <td className="border px-4 py-2">{content.id}</td>
              <td className="border px-4 py-2">{content.title}</td>
              <td className="border px-4 py-2">{content.description}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditClick(content)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  編集
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editContent && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">編集フォーム</h2>

          <div className="mb-4">
            <label htmlFor="title" className="block mb-1">タイトル</label>
            <input
              id="title"
              type="text"
              value={editContent.title}
              onChange={(e) => setEditContent({ ...editContent, title: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">説明文</label>
            <textarea
              id="description"
              value={editContent.description}
              onChange={(e) => setEditContent({ ...editContent, description: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              保存
            </button>
            <button
              onClick={() => setEditContent(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
