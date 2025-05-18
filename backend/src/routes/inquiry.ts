import express, { RequestHandler } from "express";
import { inquirySchema } from "../schemas/inquirySchema";
import { createInquiry } from "../services/inquiryService";

const router = express.Router();

const handleCreateInquiry: RequestHandler = async (req, res, next) => {
  try {
    const result = inquirySchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: "バリデーションエラー",
        details: result.error.flatten().fieldErrors,
      });
      return;
    }

    const inquiry = await createInquiry(result.data);
    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
};

router.post("/", handleCreateInquiry);
export default router;





