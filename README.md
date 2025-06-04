# AiTogashi Portfolio App 🚀

Next.js (App Router) × Express.js × Prisma × Firebase を使用した  
**フルスタック構成のポートフォリオアプリケーション** です。

---

## 概要

このアプリは、以下の２つの利用者向けに構成されています。

- **一般ユーザー向けページ**  
  - お問い合わせフォーム  
  - 作品閲覧  

- **管理者向けダッシュボード**  
  - コンテンツ管理  
  - 画像管理  
  - お問い合わせ管理  

Firebase 認証、Tailwind CSS、Docker による開発効率化が特徴です。

---

## デモ動画

以下の動画は GitHub Pages を使ってホスティングしています。  
再生ボタンを押すとブラウザ上で再生が行えます。

[![動画プレビュー](https://Ai-Togashi.github.io/portfolio/videos/demo_thumbnail.jpg)](https://Ai-Togashi.github.io/portfolio/)

---

## 機能一覧

### 一般ユーザー向け

| ページ名       | URL                   | 説明                         |
|:---------------|:----------------------|:----------------------------|
| トップページ    | `/`                   | 自己紹介、スキル、実績紹介   |
| お問い合わせ    | `/contact/form`       | お問い合わせ送信フォーム     |
| 送信完了ページ  | `/contact/complete`   | 送信完了メッセージ           |
| ポートフォリオ  | `/projects`           | 実績プロジェクトの紹介       |

### 管理者用ダッシュボード（Firebase Auth 制限）

| ページ名             | URL                      | 説明                                 |
|:---------------------|:-------------------------|:------------------------------------|
| ログインページ       | `/admin/login`           | Firebase Auth ログイン               |
| ダッシュボード       | `/admin`                 | 管理画面ホーム                       |
| お問い合わせ管理     | `/admin/inquiries`       | 一覧・編集・削除（CRUD）             |
| トップページ管理     | `/admin/contents`        | タイトル・説明編集（CRUD）           |
| 画像アップロード     | `/admin/images`          | Firebase Storage 管理                |

---

## 技術スタック

- **フロントエンド**  
  - Next.js (App Router), React, Tailwind CSS  

- **バックエンド**  
  - Express.js, Prisma ORM, MySQL  

- **認証**  
  - Firebase Authentication  

- **ストレージ**  
  - Firebase Storage (画像・動画 の URL を DB に保存)  

- **インフラ**  
  - Docker / Docker Compose  

---

## ディレクトリ構成

```bash
PORTFOLIO/
├── .vscode/
│   └── settings.json
├── backend/
│   ├── dist/
│   ├── node_modules/
│   ├── prisma/            # Prisma スキーマ・マイグレーション関連ファイル
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.ts
│   │   ├── routes/
│   │   │   └── inquiry.ts
│   │   ├── schemas/
│   │   │   └── inquirySchema.ts
│   │   ├── services/
│   │   │   └── inquiryService.ts
│   │   ├── tests/
│   │   │   └── inquiryTest.ts
│   │   └── server.ts
│   ├── .dockerignore
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── docs/                  # GitHub Pages 用ディレクトリ
│   ├── index.html
│   ├── index.md
│   └── videos/
│       └── demo.mp4       # Pages で動画をホスティングする
├── frontend/
│   ├── .next/             # Next.js ビルド成果物
│   ├── node_modules/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── contents/
│   │   │   │   ├── error.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── images/
│   │   │   │   └── page.tsx
│   │   │   ├── inquiries/
│   │   │   │   └── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── test/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   ├── complete/
│   │   │   │   └── page.tsx
│   │   │   └── form/
│   │   │       └── page.tsx
│   │   ├── data/
│   │   │   ├── projects/
│   │   │   │   ├── chochikuApp.ts
│   │   │   │   ├── kakeiboApp.ts
│   │   │   │   └── linkageApp.ts
│   │   │   ├── projects.ts
│   │   │   └── skills.ts
│   │   ├── projects/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── provider.tsx
│   ├── public/
│   │   ├── images/
│   │   │   ├── chochiku-placeholder.jpg
│   │   │   ├── image画像.png
│   │   │   ├── kakeibo-placeholder.jpg
│   │   │   └── linkage-placeholder.jpg
│   │   ├── videos/
│   │   │   ├── demo.mp4
│   │   │   └── app-presentation.mp4
│   │   ├── placeholder.svg
│   │   └── styles.css
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── button.tsx
│   │   │       └── card.tsx
│   │   ├── hooks/
│   │   │   └── useContents.ts
│   │   ├── lib/
│   │   │   ├── firebase-admin.ts
│   │   │   ├── firebase.ts
│   │   │   ├── prisma.ts
│   │   │   ├── styles/
│   │   │   │     └── (Tailwind など共通スタイル用ファイル)
│   │   │   └── utils.ts
│   │   └── utils/
│   │         └── validateEnv.ts
│   ├── .env.local
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── eslint.config.mjs
│   ├── middleware.ts
│   ├── middleware.ts.bak
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── .gitignore
├── docker-compose.yml
└── README.md
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

