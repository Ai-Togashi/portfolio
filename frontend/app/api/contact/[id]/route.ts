import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../route"; 

/** 
 * GET /api/inquiries/{id}
 * -- 単一お問い合わせを取得
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "無効な ID です" }, { status: 400 });
  }

  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
    });
    if (!inquiry) {
      return NextResponse.json({ error: "該当データが存在しません" }, { status: 404 });
    }
    return NextResponse.json(inquiry, { status: 200 });
  } catch (error) {
    console.error(`[GET /api/inquiries/${id}] Error:`, error);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}

/** 
 * PUT /api/inquiries/{id}
 * -- お問い合わせレコードの更新
 * リクエストボディ JSON: { name: string, email: string, message: string }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "無効な ID です" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    // 更新実行
    const updated = await prisma.inquiry.update({
      where: { id },
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error(`[PUT /api/inquiries/${id}] Error:`, error);
    // レコードがない場合の対応
    if (error.code === "P2025") {
      return NextResponse.json({ error: "該当データが存在しません" }, { status: 404 });
    }
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}

/** 
 * DELETE /api/inquiries/{id}
 * -- お問い合わせレコードの削除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "無効な ID です" }, { status: 400 });
  }

  try {
    await prisma.inquiry.delete({
      where: { id },
    });
    return NextResponse.json({ message: "削除しました" }, { status: 200 });
  } catch (error: any) {
    console.error(`[DELETE /api/inquiries/${id}] Error:`, error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "該当データが存在しません" }, { status: 404 });
    }
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}
