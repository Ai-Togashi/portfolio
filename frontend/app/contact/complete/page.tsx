// /frontend/app/contact/complete/page.tsx
import Link from 'next/link';

export default function ContactComplete() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-white p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          お問い合わせありがとうございました！
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          内容を確認し、折り返しご連絡いたします。
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-green-400 to-blue-400 text-white text-lg font-semibold py-3 rounded-lg hover:brightness-110 transition active:scale-95"
          >
            トップページに戻る
          </Link>

          <Link
            href="/portfolio"
            className="block w-full border border-green-400 text-green-500 text-lg font-semibold py-3 rounded-lg hover:bg-green-50 transition"
          >
            ポートフォリオページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
