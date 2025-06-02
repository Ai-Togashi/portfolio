"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [error, setError] = useState("");
  const [editInquiry, setEditInquiry] = useState<Inquiry | null>(null);

  // 一覧取得
  const fetchInquiries = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("バックエンドのURLが設定されていません");
      const res = await fetch(`${apiUrl}/api/inquiries`);
      if (!res.ok) throw new Error("データの取得に失敗しました");
      const data = await res.json();
      setInquiries(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // 編集ボタン押下 → フォーム表示
  const handleEditClick = (inquiry: Inquiry) => {
    setEditInquiry(inquiry);
  };

  // 保存ボタン押下 → PUT 送信
  const handleSaveEdit = async () => {
    if (!editInquiry) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("バックエンドのURLが設定されていません");

      const res = await fetch(`${apiUrl}/api/inquiries/${editInquiry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editInquiry.name,
          email: editInquiry.email,
          message: editInquiry.message,
        }),
      });

      if (!res.ok) throw new Error("更新に失敗しました");

      toast.success("更新しました！");
      setEditInquiry(null);
      fetchInquiries();
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました");
    }
  };

  // 削除ボタン押下 → DELETE 送信
  const handleDeleteClick = async (id: number) => {
    const confirmed = confirm("本当に削除しますか？");
    if (!confirmed) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("バックエンドのURLが設定されていません");

      const res = await fetch(`${apiUrl}/api/inquiries/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("削除に失敗しました");

      toast.success("削除しました！");
      fetchInquiries();
    } catch (error) {
      console.error(error);
      toast.error("削除に失敗しました");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">お問い合わせ一覧</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">名前</th>
            <th className="border px-4 py-2">メールアドレス</th>
            <th className="border px-4 py-2">メッセージ</th>
            <th className="border px-4 py-2">日時</th>
            <th className="border px-4 py-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <tr key={inq.id}>
              <td className="border px-4 py-2">{inq.id}</td>
              <td className="border px-4 py-2">{inq.name}</td>
              <td className="border px-4 py-2">{inq.email}</td>
              <td className="border px-4 py-2">{inq.message}</td>
              <td className="border px-4 py-2">
                {new Date(inq.createdAt).toLocaleString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="border px-4 py-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditClick(inq)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    編集
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(inq.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    削除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 編集フォーム */}
      {editInquiry && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h2 className="text-xl mb-4 font-semibold">編集フォーム</h2>

          <div className="mb-2">
            <label htmlFor="name" className="block mb-1">
              名前
            </label>
            <input
              id="name"
              type="text"
              value={editInquiry.name}
              onChange={(e) =>
                setEditInquiry({ ...editInquiry, name: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="block mb-1">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={editInquiry.email}
              onChange={(e) =>
                setEditInquiry({ ...editInquiry, email: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="message" className="block mb-1">
              メッセージ
            </label>
            <textarea
              id="message"
              value={editInquiry.message}
              onChange={(e) =>
                setEditInquiry({ ...editInquiry, message: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              保存
            </button>
            <button
              type="button"
              onClick={() => setEditInquiry(null)}
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

