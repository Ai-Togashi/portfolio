// /frontend/app/portfolio/page.tsx
import React from "react";
import Link from "next/link";

const PortfolioPage = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <section className="max-w-3xl w-full text-center bg-white shadow-2xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>

        <p className="text-lg mb-6 text-gray-600">
          フルスタックエンジニアとしての開発実績をご紹介します。
        </p>

        {/* スペース */}
        <div className="h-24" />

        <div className="space-y-8">
          {/* 家計簿アプリ */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">家計簿アプリ</h2>
            <p className="text-gray-600 leading-relaxed">
              Next.js（App Router）とExpress.js（Prisma）で構築した家計簿アプリ。<br />
            </p>
            <div className="mt-6">
              <Link href="/contact/form">
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 active:scale-95 transition">
                  デモを見る
                </button>
              </Link>
            </div>
          </div>

          {/* ポートフォリオアプリ */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">ポートフォリオアプリ</h2>
            <p className="text-gray-600 leading-relaxed">
              Next.js（App Router）とExpress.js（Prisma）で構築した紹介アプリ。<br />
              Firebase AuthとStorageを使用し、画像アップロードにも対応しています。
            </p>
            <div className="mt-6">
              <Link href="/portfolio">
                <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 active:scale-95 transition">
                  デモを見る
                </button>
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-sm text-gray-500">
          &copy; 2025 あなたの名前
        </footer>
      </section>
    </main>
  );
};

export default PortfolioPage;
