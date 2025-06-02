"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { z } from "zod";

// ---- Zod スキーマ定義 ----
const schema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  message: z.string().min(5, "お問い合わせ内容は5文字以上で入力してください"),
});

export default function ContactFormPage() {
  const router = useRouter();

  // ステート
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // バリデーション
    const result = schema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as string;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      // ここが重要！ 環境変数からバックエンドのURLを取り出す
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("バックエンドのURLが設定されていません");

      // POST リクエスト
      const res = await fetch(`${apiUrl}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        // JSON 以外（HTML エラーなど）が返ってきたときに備えて try / catch しておく
        let data: any = null;
        try {
          data = await res.json();
        } catch {
          // 何もしない
        }
        const msg = data?.error || "送信に失敗しました";
        alert(msg);
        setLoading(false);
        return;
      }

      // 正常終了 → 完了ページへ遷移
      router.push("/contact/complete");
    } catch (err) {
      console.error("通信エラー:", err);
      alert("通信エラーが発生しました");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          お問い合わせフォーム
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 名前 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              お名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
              placeholder="例）山田 太郎"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          {/* メールアドレス */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
              placeholder="例）example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          {/* メッセージ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              メッセージ
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
              placeholder="お問い合わせ内容をご記入ください"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-400">{errors.message}</p>
            )}
          </div>

          {/* 送信ボタン */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-bold rounded-md transition duration-300 transform ${
                loading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:scale-105 hover:brightness-110"
              }`}
            >
              {loading ? "送信中..." : "送信する"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}




