// frontend/app/data/projects.tsx

export type Project = {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  imageSrc: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "家計簿アプリ",
    description:
      "Next.js（App Router）とExpress.js、Prismaを利用した家計簿アプリ。ユーザー登録・収支入力・グラフ表示機能付き。",
    githubUrl: "https://github.com/Ai-Togashi/kakeiboapp.git",
    imageSrc: "/images/kakeibo-placeholder.jpg",
  },
  {
    id: 2,
    title: "ちょちくアプリ",
    description:
      "GMOあおぞらネット銀行APIを活用した貯蓄提案アプリ。AWS Lambdaをバックエンドに、LINE通知機能も搭載。",
    githubUrl: "https://github.com/Ai-Togashi/chochikuapp.git",
    imageSrc: "/images/chochiku-placeholder.jpg",
  },
  {
    id: 3,
    title: "Linkageアプリ",
    description:
      "FlaskとNext.jsを用いた高齢者と若者のマッチングアプリ。Firebase認証とStripe決済を搭載。外部APIを使用して地図機能も実施。",
    githubUrl: "https://github.com/Ai-Togashi/Linkageapp.git",
    imageSrc: "/images/linkage-placeholder.jpg",
  },
];

export default projects;




