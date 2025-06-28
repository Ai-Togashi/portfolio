// frontend/app/data/projects/kakeiboApp.ts

export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  detailContent: string;
};

const kakeiboApp: Project = {
  id: 1,
  title: "家計簿アプリ",
  description:
    "Next.js（App Router）と Express.js（Prisma）で構築した家計簿アプリ。収支入力・グラフ表示機能を備えています。",
  imageUrl: "/images/kakeibo-placeholder.jpg", 
  githubUrl: "https://github.com/Ai-Togashi/kakeiboapp.git",
  detailContent: `
## 家計簿アプリ の詳細

このプロジェクトは、フルスタック学習の一環として作成した家計簿アプリです。主な機能は以下のとおりです。

- **収支入力画面**  
  日付、カテゴリー、金額、メモを登録可能。バックエンド（Express.js + Prisma + MySQL）にデータ保存。

- **収支一覧表示**  
  登録済みの収支データを日付順にテーブル表示し、合計金額やカテゴリ別集計を確認できます。

- **月次グラフ**  
  Chart.js を使って、月ごとの収入・支出を折れ線グラフで可視化。動的にデータを取得して描画します。

- **レスポンシブ対応**  
  Tailwind CSSによるスマホ〜PC対応のUIデザインを実施。

---

### 技術スタック

- **フロントエンド**  
  - Next.js (App Router)  
  - TypeScript  
  - Tailwind CSS    
  - Chart.js  

- **バックエンド**  
  - Express.js  
  - Prisma ORM  
  - MySQL  
  - Joi (入力バリデーション)  
  - Docker / Docker Compose  

- **その他**  
  - ESLint / Prettier / Husky (コード品質チェック)  

---

### デモ＆使い方

1. リポジトリをクローン  
   \`\`\`bash
   git clone https://github.com/Ai-Togashi/kakeiboapp.git
   cd kakeibo-app
   \`\`\`

2. Docker で起動  
   \`\`\`bash
   docker compose up --build
   \`\`\`

3. ブラウザで開く  
   \`http://localhost:3000\` にアクセスし、家計簿を利用できます。

---
  `,
};

export default kakeiboApp;
