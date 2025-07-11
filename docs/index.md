---
layout: default
---

# AiTogashi Portfolio App 🚀

Next.js（App Router）× Express.js × Prisma × Firebase を使用。 
**フルスタック構成のポートフォリオアプリケーション**です。

---

##  概要

このアプリは、以下の2つの利用者向けに構成されています。

-  一般ユーザー向けページ（お問い合わせ・作品閲覧）
-  管理者向けダッシュボード（コンテンツ・画像・お問い合わせ管理）

Firebase認証、Tailwind CSSによるUI、Dockerによる開発効率化が特徴です。

## デモ動画

以下の動画は GitHub Pages を使ってホスティングしています。  
再生ボタンを押すとブラウザ上で再生が行えます。

<video
  src="https://Ai-Togashi.github.io/portfolio/videos/demo.mp4"
  controls
  width="640"
  height="360"
>
  お使いのブラウザは video タグに対応していません。
</video>


---

##  機能一覧

###  一般ユーザー向け

| ページ名       | URL                   | 説明                        |
|----------------|------------------------|-----------------------------|
| トップページ    | `/`                    | 自己紹介、スキル、実績紹介  |
| お問い合わせ   | `/contact/form`        | ユーザー向け送信フォーム   |
| 送信完了ページ | `/contact/complete`    | お礼と遷移リンク表示        |
| ポートフォリオ | `/projects`           | 実績プロジェクトの紹介     |

###  管理者用ダッシュボード（Firebase Auth制限）

| ページ名           | URL                  | 説明                       |
|--------------------|----------------------|----------------------------|
| ログインページ      | `/admin/login`       | Firebase Authログイン       |
| ダッシュボード      | `/admin`             | 管理画面ホーム              |
| お問い合わせ管理   | `/admin/inquiries`   | 一覧・編集・削除（CRUD）   |
| トップページ管理    | `/admin/contents`    | タイトル・説明編集（CRUD） |
| 画像アップロード    | `/admin/images`      | Firebase Storage管理       |

---

##  技術スタック

| カテゴリ         | 技術構成                             |
|------------------|--------------------------------------|
| フロントエンド   | Next.js (App Router), React, Tailwind CSS |
| バックエンド     | Express.js, Prisma ORM, MySQL        |
| 認証             | Firebase Authentication              |
| ストレージ       | Firebase Storage                     |
| インフラ         | Docker, Docker Compose               |


---

##  ディレクトリ構成

```bash
PORTFOLIO/
├─ .vscode/
│ └─ settings.json
├─ backend/
│ ├─ dist/
│ ├─ node_modules/
│ ├─ prisma/
│ │ └─ (Prisma スキーマ・マイグレーション関連ファイル)
│ └─ src/
│ │ └─ lib/
│ │    └─ prisma.ts
│ ├─ routes/
│ │ └─ inquiry.ts
│ ├─ schemas/
│ │ └─ inquirySchema.ts
│ ├─ services/
│ │ └─ inquiryService.ts
│ ├─ tests/
│ │ └─ inquiryTest.ts
│ └─ server.ts
│ ├─ .dockerignore
│ ├─ .env
│ ├─ .gitignore
│ ├─ Dockerfile
│ ├─ eslint.config.js
│ ├─ package-lock.json
│ ├─ package.json
│ ├─ tsconfig.json
│ └─ vitest.config.ts
├─ frontend/
│ ├─ .next/
│ │ └─ (Next.js ビルド成果物)
│ ├─ node_modules/
│ ├─ app/
│ │ ├─ admin/
│ │ │ ├─ contents/
│ │ │ │ ├─ error.tsx
│ │ │ │ ├─ loading.tsx
│ │ │ │ └─ page.tsx
│ │ │ ├─ images/
│ │ │ │ └─ page.tsx
│ │ │ ├─ inquiries/
│ │ │ │ └─ page.tsx
│ │ │ ├─ login/
│ │ │ │ └─ page.tsx
│ │ │ ├─ layout.tsx
│ │ │ └─ page.tsx
│ │ ├─ api/
│ │ │ ├─ contact/
│ │ │ │ ├─ [id]/
│ │ │ │ │ └─ route.ts
│ │ │ │ └─ route.ts
│ │ │ └─ test/
│ │ │ └─ page.tsx
│ │ ├─ contact/
│ │ │ ├─ complete/
│ │ │ │ └─ page.tsx
│ │ │ └─ form/
│ │ │ └─ page.tsx
│ │ ├─ data/
│ │ │ ├─ projects/
│ │ │ │ ├─ chochikuApp.ts
│ │ │ │ ├─ kakeiboApp.ts
│ │ │ │ └─ linkageApp.ts
│ │ │ ├─ projects.ts
│ │ │ └─ skills.ts
│ │ ├─ projects/
│ │ │ └─ [id]/
│ │ │     └─ page.tsx
│ │ ├─ globals.css
│ │ ├─ layout.tsx
│ │ ├─ page.tsx
│ │ └─ provider.tsx
│ ├─ public/
│ │ ├─ images/
│ │ │ ├─ chochiku-placeholder.jpg
│ │ │ ├─ image画像.png
│ │ │ ├─ kakeibo-placeholder.jpg
│ │ │ └─ linkage-placeholder.jpg
│ │ ├─ videos/
│ │ │ ├─ demo.mp4
│ │ │ └─ app-presentation.mp4
│ │ ├─ placeholder.svg
│ │ └─ styles.css
│ ├─ next.config.js
│ ├─ tailwind.config.js
│ ├─ postcss.config.js
│ ├─ tsconfig.json
│ ├─ package.json
│ └─ README.md
├─ src/
│ ├─ components/
│ │ └─ ui/
│ │ ├─ button.tsx
│ │ └─ card.tsx
│ ├─ hooks/
│ │ └─ useContents.ts
│ ├─ lib/
│ │ ├─ styles/
│ │ │ └─ (Tailwind など共通スタイル用ファイル)
│ │ ├─ firebase-admin.ts
│ │ ├─ firebase.ts
│ │ ├─ prisma.ts
│ │ └─ utils.ts
│ └─ utils/
│ └─ validateEnv.ts
├─ .dockerignore
├─ .env ← ルート共通／開発環境用
├─ .env.local ← 各サービス固有の環境変数
├─ .gitignore
├─ docker-compose.yml
├─ eslint.config.js
├─ eslint.config.mjs
├─ middleware.ts
├─ middleware.ts.bak
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.tsbuildinfo
└─ README.md
```

---

### Docker 起動（DB・APIサーバー）

```bash
docker compose up -d
```

### Prismaマイグレーション（初回）
```bash
npx prisma migrate dev
```

```bash
npx prisma studio
```

### フロントエンド起動
```bash
cd frontend
npm install
npm run dev
```

### バックエンド（Express）起動
```bash
cd backend
npm install
npm run dev
```

---#   �0�0�0�0�0�0�0
 
 