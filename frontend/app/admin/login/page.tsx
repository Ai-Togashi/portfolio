"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setCookie } from "nookies";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ① 空入力チェック
    if (!email.trim() || !password.trim()) {
      setError("メールアドレスとパスワードを入力してください。");
      setLoading(false);
      return;
    }

    try {
      // ② Firebase Auth でサインイン
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ③ カスタムクレームから管理者権限をチェック
      const tokenResult = await user.getIdTokenResult();
      const isAdmin = tokenResult.claims.admin as boolean;
      if (!isAdmin) {
        setError("このアカウントには管理者権限がありません。");
        setLoading(false);
        return;
      }

      // ④ クライアント側にトークンを Cookie に保存（有効期限 1 時間）
      const token = tokenResult.token;
      setCookie(null, "token", token, {
        maxAge: 60 * 60, // 1 hour
        path: "/",
      });

      // ⑤ 管理画面トップへリダイレクト
      router.push("/admin/inquiries");
    } catch (err: any) {
      console.error("サインインエラー:", err);
      // Firebase 認証エラーコードごとにメッセージを分岐
      switch (err.code) {
        case "auth/user-not-found":
          setError("ユーザーが存在しません。");
          break;
        case "auth/wrong-password":
          setError("パスワードが違います。");
          break;
        case "auth/invalid-email":
          setError("メールアドレスの形式が正しくありません。");
          break;
        case "auth/invalid-credential":
          setError("無効なメールアドレスまたはパスワードです。");
          break;
        default:
          setError("ログインに失敗しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          管理者ログイン
        </h1>

        {/* エラーメッセージ */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* メールアドレス入力 */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="admin@example.com"
            required
          />
        </div>

        {/* パスワード入力 */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="********"
            required
          />
        </div>

        {/* ログインボタン */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-medium rounded-md transition-colors ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </div>
  );
}

