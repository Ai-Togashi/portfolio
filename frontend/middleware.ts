// frontend/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ /admin/login は認証不要（誰でもOK）
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // ✅ /admin 配下は認証チェック
  if (pathname.startsWith("/admin")) {
    // クッキーからトークン取得
    const token = req.cookies.get("token")?.value;

    // トークンがなければ 404 ページへ rewrite
    if (!token) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }
  }

  // ✅ 問題なければそのまま続行
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // /admin配下をすべて監視
  ],
};
