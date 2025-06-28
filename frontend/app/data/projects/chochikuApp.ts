// frontend/app/data/projects/chochikuApp.ts

export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  detailContent: string;
};

const chichikuApp: Project = {
  id: 2,
  title: "ちょちくアプリ",
  description:
    "GMOあおぞらネット銀行APIを利用した貯蓄提案アプリ。AWS Lambdaバックエンド・LINE通知連携を備えています。",
  imageUrl: "/images/chochiku-placeholder.jpg", 
  githubUrl: "https://github.com/Ai-Togashi/chochikuapp.git",
  detailContent: `
## ちょちくアプリ の詳細

「ちょちくアプリ」は、銀行APIを用いてユーザーの貯蓄活動をサポートするアプリです。主な機能は以下のとおりです。

- **ユーザー認証**  
  Firebase Authenticationを使用し、ユーザー別に貯蓄データを管理。

- **目標金額設定**  
  貯蓄目標額を自由に設定可能。現在の貯蓄状況を視覚的に表示。

- **入金・出金記録**  
  GMOあおぞらネット銀行API（sunabar）を活用し、入出金履歴を取得・記録。

- - **LINE通知機能**  
  AWS Lambda経由でLINE Bot APIと連携し、貯蓄可能額をユーザーに通知。

- **レスポンシブ対応**  
  Tailwind CSSを使ったモバイル対応の直感的なUI設計。
---

### 技術スタック

- **フロントエンド**  
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS
  - Firebase Authentication

- **バックエンド**  
  - AWS Lambda
  - API Gateway
  - GMOあおぞらネット銀行API（sunabar）
  - LINE Bot API

- **インフラ・環境**  
  - AWS Lambda（サーバーレスアーキテクチャ）

  - **その他**  
  - ESLint / Prettier / Husky（コード品質管理）
  - Postman（API動作確認） 

---

### デモ＆使い方

1. リポジトリをクローン  
   \`\`\`bash
   git clone https://github.com/Ai-Togashi/chochikuapp.git
   cd chochiku-app
   \`\`\`

2. 環境変数設定（.env）  
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:3001
   FIREBASE_API_KEY=…
   FIREBASE_AUTH_DOMAIN=…
   FIREBASE_PROJECT_ID=…
   \`\`\`

3. AWS Lambdaデプロイ  
   \`\`\`bash
   AWSコンソールからLambda関数を作成し、設定を反映します。
   \`\`\`

4. ブラウザで開く  
   - フロントエンド: \`http://localhost:3000\`  
   - 管理画面: \`http://localhost:3000/admin/login\`  
   - API サーバー: \`http://localhost:3001/api/... \`

---
  `,
};

export default chichikuApp;
