import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.inquiry.deleteMany(); 
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Inquiry モデルの基本操作", () => {
  it("問い合わせを作成できる", async () => {
    const created = await prisma.inquiry.create({
      data: {
        name: "Vitest太郎",
        email: "vitest@example.com",
        message: "Vitestからのテストです。",
      },
    });

    expect(created).toHaveProperty("id");
    expect(created.email).toBe("vitest@example.com");
    expect(created.name).toBe("Vitest太郎");
    expect(created.message).toBe("Vitestからのテストです。");
  });

  it("問い合わせを一覧取得できる", async () => {
    const inquiries = await prisma.inquiry.findMany();
    expect(Array.isArray(inquiries)).toBe(true);
    expect(inquiries.length).toBeGreaterThan(0);
  });
});


