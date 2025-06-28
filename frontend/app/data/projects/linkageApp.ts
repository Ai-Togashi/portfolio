// frontend/app/data/projects/linkageApp.ts

export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  detailContent: string;
};

const linkageApp: Project = {
  id: 3,
  title: "Linkageアプリ",
  description:
    "高齢者と若者をつなぐマッチングアプリ。FlaskとNext.jsを用い、Firebase認証・Stripe決済・Google Maps連携を搭載。",
  imageUrl: "/images/linkage-placeholder.jpg", 
  githubUrl: "https://github.com/Ai-Togashi/Linkageapp.git",
  detailContent: `
## Linkageアプリ の詳細

「Linkage」は、高齢者と若者をマッチングし、相互支援や同居をサポートするプラットフォームです。

- **ユーザー認証**  
  Firebase Auth を使用し、ユーザー（若者）とオーナー（高齢者）のロールを区別してログイン認証を実装しています。

- **プロフィール管理**  
  各ユーザーは自己紹介、希望条件、物件情報などを詳細に登録可能。  
  
- **物件検索・詳細閲覧**  
  ユーザーはオーナーの提供する物件を検索し、詳細ページで設備や家賃情報を確認可能。Google Maps API 連携で地図表示も対応。

- **申し込み・マッチングフロー**  
  1. ユーザーが物件に申し込み  
  2. オーナーが申し込みを承認するとマッチング成立  
  3. Stripe 決済画面に遷移し、家賃初月分を支払い  
  4. 継続家賃支払い・退去アンケート機能も実装

- **ポストマッチング機能**  
  - **コミュニケーション**: マッチング後、お手伝い機能でやり取り  
  - **レビュー**: マッチング終了後、相手へのレビュー投稿  
  - **通知**: マッチングや支払い期限リマインダーをメールおよびアプリ内通知で配信

- **管理者画面**  
  管理者専用ダッシュボードで全ユーザー・オーナーの管理、マッチング状況の確認が可能。  
  - Tabbed UI + Table + Dialog を使った CRUD 管理画面

- **テスト・CI/CD**  
  - バックエンド: pytest によるユニット/統合テスト  
  - フロントエンド: Vitest / ESLint / Prettier を組み込んだ E2E テスト  
  - GitHub Actions で PR 時に自動テストと Lint チェックを実行  
  
---

### 技術スタック

- **フロントエンド**  
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS
  - Firebase Authentication
  - React Query 

- **バックエンド**  
  - Flask  
  - SQLAlchemy + Alembic  
  - PostgreSQL  
  - Flask-Migrate  
  - Flask-CORS  
  - Stripe API  
  - Docker / Docker Compose  

- **外部サービス**  
  - Google Maps API
  - Stripe

- **テスト・CI/CD**  
  - pytest（バックエンド）
  - Vitest（フロントエンド）
  - ESLint / Prettier
  - GitHub Actions（自動テスト）

  - **その他**
  - Postman
  - DBeaver
  - Figma（UI設計）

---

### デモ＆使い方

1. リポジトリをクローン  
   \`\`\`bash
   git clone https://github.com/Ai-Togashi/Linkageapp.git
   cd linkage-app
   \`\`\`

2. 環境変数設定（.env）  
   \`\`\`
   FLASK_APP=backend/app/main.py
   DATABASE_URL=postgresql://user:password@db:5432/linkage
   FIREBASE_API_KEY=…
   FIREBASE_AUTH_DOMAIN=…
   FIREBASE_PROJECT_ID=…
   STRIPE_SECRET_KEY=…
   NEXT_PUBLIC_API_URL=http://localhost:5001
   \`\`\`

3. Docker で起動  
   \`\`\`bash
   docker compose up --build
   \`\`\`

4. ブラウザで開く  
   - フロントエンド: \`http://localhost:3000\`  
   - API サーバー: \`http://localhost:5001/api/... \`  
   - 管理者画面: \`http://localhost:3000/admin/dashboard\`  

---
  `,
};

export default linkageApp;
