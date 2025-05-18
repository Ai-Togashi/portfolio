// src/middleware/authMiddleware.ts

// FirebaseとExpressのインポート
import { getAuth } from "firebase/auth";
import firebaseApp from "../lib/firebase";  // firebase.tsのインポート
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 認証チェックミドルウェア
export function withAuthMiddleware(req: NextRequest) {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;  // 現在のユーザーを取得

  // 未認証の場合、404を返す
  if (!user) {
    return NextResponse.rewrite(new URL('/404', req.url));  // 404ページにリダイレクト
  }

  return NextResponse.next();  // 認証されていれば次の処理へ進む
}

