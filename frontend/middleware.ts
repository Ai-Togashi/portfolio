import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ /admin/login はスキップ（誰でも見れる）
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // ✅ /admin 配下は cookie の token が存在するか確認
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      // トークンが無ければログインページへ
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

