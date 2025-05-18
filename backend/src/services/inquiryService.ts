import { prisma } from "../lib/prisma";

export const createInquiry = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  return await prisma.inquiry.create({ data });
};

