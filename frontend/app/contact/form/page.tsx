// frontend/app/contact/form/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactFormPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      // ✅ 成功時に /contact/complete へリダイレクト！
      router.push("/contact/complete");

      // ✨（任意）デバッグ用
      // console.log("送信完了！completeページへ");
    } else {
      alert("送信に失敗しました");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          お問い合わせフォーム
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              お名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition placeholder:text-gray-400"
              placeholder="例）山田 太郎"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition placeholder:text-gray-400"
              placeholder="例）example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              お問い合わせ内容
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition placeholder:text-gray-400"
              placeholder="お問い合わせ内容をご記入ください"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white text-lg font-semibold py-3 rounded-lg hover:brightness-110 transition active:scale-95"
            >
              送信する
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
