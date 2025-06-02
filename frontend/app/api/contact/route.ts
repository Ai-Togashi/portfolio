import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({

  });
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

/** 
 * GET /api/inquiries
 * -- 全件取得
 */
export async function GET(request: NextRequest) {
  try {
    const allInquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(allInquiries, { status: 200 });
  } catch (error) {
    console.error("[GET /api/inquiries] Error:", error);
    return NextResponse.json({ error: "データ取得に失敗しました" }, { status: 500 });
  }
}

/** 
 * POST /api/inquiries
 * -- 新規作成
 * リクエストボディ JSON: { name: string, email: string, message: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // バリデーション（簡易的に空チェック）
    if (!name || !email || !message) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    // レコード作成
    const created = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("[POST /api/inquiries] Error:", error);
    return NextResponse.json({ error: "作成に失敗しました" }, { status: 500 });
  }
}

