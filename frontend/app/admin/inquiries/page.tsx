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

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inquiries`);
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

  const handleEditClick = (inquiry: Inquiry) => {
    setEditInquiry(inquiry);
  };

  const handleSaveEdit = async () => {
    if (!editInquiry) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inquiries/${editInquiry.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editInquiry),
        }
      );

      if (!res.ok) throw new Error("更新に失敗しました");

      toast.success("更新しました！");
      setEditInquiry(null);
      fetchInquiries();
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました");
    }
  };

  const handleDeleteClick = async (id: number) => {
    const confirmed = confirm("本当に削除しますか？");
    if (!confirmed) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inquiries/${id}`, {
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

      {error && <p className="text-red-500">{error}</p>}

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
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
              <td className="border px-4 py-2">{new Date(inq.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEditClick(inq)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDeleteClick(inq.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editInquiry && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h2 className="text-xl mb-4">編集フォーム</h2>

          <div className="mb-2">
            <label className="block">名前</label>
            <input
              type="text"
              value={editInquiry.name}
              onChange={(e) => setEditInquiry({ ...editInquiry, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block">メールアドレス</label>
            <input
              type="email"
              value={editInquiry.email}
              onChange={(e) => setEditInquiry({ ...editInquiry, email: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block">メッセージ</label>
            <textarea
              value={editInquiry.message}
              onChange={(e) => setEditInquiry({ ...editInquiry, message: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              保存
            </button>
            <button
              onClick={() => setEditInquiry(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

