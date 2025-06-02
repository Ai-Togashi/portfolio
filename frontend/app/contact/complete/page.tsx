'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CompletePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // フェードイン効果のための遅延表示
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-white px-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center transform transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          お問い合わせありがとうございました。
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          内容を確認の上、担当者よりご連絡いたします。
        </p>

        <Link
          href="/"
          className="inline-block w-full bg-gradient-to-r from-green-400 to-blue-400 text-white text-lg font-semibold py-3 rounded-lg transition duration-300 ease-in-out hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95"
        >
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}

