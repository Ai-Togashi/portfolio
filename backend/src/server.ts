import express, { RequestHandler } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// CORS設定
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

/* ====================================================
  ✅ 動作確認用
==================================================== */
app.get("/", ((req, res) => {
  res.send("Hello from Portfolio API 🚀");
}) as RequestHandler);

/* ====================================================
  ✅ /api/contents CRUD API
==================================================== */

// 一覧取得
const getContents: RequestHandler = async (req, res, next) => {
  try {
    const contents = await prisma.content.findMany();
    res.json(contents);
  } catch (error) {
    next(error);
  }
};

// 詳細取得
const getContentById: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const content = await prisma.content.findUnique({
      where: { id },
    });
    if (!content) {
      res.status(404).json({ error: "コンテンツが見つかりません" });
      return;
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// 新規作成
const createContent: RequestHandler = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: "タイトルと説明文は必須です" });
      return;
    }

    const newContent = await prisma.content.create({
      data: { title, description },
    });
    res.status(201).json(newContent);
  } catch (error) {
    next(error);
  }
};

// 更新
const updateContent: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: "タイトルと説明文は必須です" });
      return;
    }

    const updatedContent = await prisma.content.update({
      where: { id },
      data: { title, description },
    });
    res.json(updatedContent);
  } catch (error) {
    next(error);
  }
};

// 削除
const deleteContent: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.content.delete({
      where: { id },
    });
    res.json({ message: "削除しました" });
  } catch (error) {
    next(error);
  }
};

app.get("/api/contents", getContents);
app.get("/api/contents/:id", getContentById);
app.post("/api/contents", createContent);
app.put("/api/contents/:id", updateContent);
app.delete("/api/contents/:id", deleteContent);

/* ====================================================
  ✅ /api/inquiries CRUD API
==================================================== */

// 一覧取得
const getInquiries: RequestHandler = async (req, res, next) => {
  try {
    const inquiries = await prisma.inquiry.findMany();
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};

// 新規作成
const createInquiry: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "全ての項目を入力してください。" });
      return;
    }

    const newInquiry = await prisma.inquiry.create({
      data: { name, email, message },
    });
    res.status(201).json(newInquiry);
  } catch (error) {
    next(error);
  }
};

// 更新
const updateInquiry: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email, message } = req.body;

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: { name, email, message },
    });
    res.json(updatedInquiry);
  } catch (error) {
    next(error);
  }
};

// 削除
const deleteInquiry: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.inquiry.delete({
      where: { id },
    });
    res.json({ message: "削除しました" });
  } catch (error) {
    next(error);
  }
};

app.get("/api/inquiries", getInquiries);
app.post("/api/inquiries", createInquiry);
app.put("/api/inquiries/:id", updateInquiry);
app.delete("/api/inquiries/:id", deleteInquiry);

/* ====================================================
  ✅ 共通エラーハンドラー
==================================================== */
app.use(
  (
    error: unknown,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);
    res.status(500).json({ error: "サーバーエラーが発生しました。" });
  },
);

/* ====================================================
  ✅ サーバー起動
==================================================== */
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});
