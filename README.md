# AiTogashi Portfolio App 🚀

Next.js（App Router）× Express.js × Prisma × Firebase を使用。 
フルスタック開発のポートフォリオアプリケーションです！

---

## 📚 概要

- ユーザー向けの「お問い合わせフォーム」と
- 管理者向けの「コンテンツ管理・画像管理」が行えるサイトです。
- Docker環境で Next.js と Express.js を構築し、Prisma + Firebase でデータ・認証管理を実装。

---

## ✅ 主な機能

### 🌐 一般ユーザー向けページ
| ページ名      | URL                 | 説明              |
|---------------|---------------------|-------------------|
| トップページ  | `/contact`          | 公開ページトップ  |
| お問い合わせ  | `/contact/form`     | 入力・送信フォーム |
| 完了ページ    | `/contact/complete` | 送信完了メッセージ |

### 🔐 管理者専用ページ
| ページ名                | URL                | 説明                       |
|-------------------------|--------------------|----------------------------|
| ログインページ          | `/admin/login`     | Firebase Auth 認証         |
| ダッシュボード          | `/admin`           | 管理画面トップ            |
| 問い合わせ管理          | `/admin/inquiries` | 一覧・編集・削除 CRUD     |
| トップページコンテンツ管理 | `/admin/contents`  | タイトル・説明・画像管理   |
| 画像アップロード        | `/admin/images`    | Firebase Storage 管理     |

---

## 🛠️ 技術スタック

- **フロントエンド**: Next.js（App Router） / React / Tailwind CSS
- **バックエンド**: Express.js / Prisma / MySQL
- **認証**: Firebase Auth
- **ストレージ**: Firebase Storage
- **インフラ**: Docker / Docker Compose
- **デプロイ**: Vercel（フロント） / Render または Railway（バックエンド）

---

## 🚀 セットアップ方法（ローカル開発）

### 1. リポジトリをクローン
```bash
git clone https://github.com/あなたのユーザー名/リポジトリ名.git
cd リポジトリ名

# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
FIREBASE_API_KEY=xxx

# backend/.env
DATABASE_URL=mysql://root:password@localhost:3306/portfolio_db

#Docker 起動（DB・APIサーバー）
docker compose up -d

#Prisma マイグレーション & Studio（DB管理画面）
npx prisma migrate dev
npx prisma studio

#フロントエンド起動
cd frontend
npm install
npm run dev

#バックエンド（Express）起動
cd backend
npm install
npm run dev
