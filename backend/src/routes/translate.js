//translateControllers

import express from "express";
import { translateControllers } from "../controllers/translate.js";
const router = express.Router();
router.post(
  "/translate-openai",
  translateControllers.handleTranslateUsingOpenAI
);
router.post("/translate", translateControllers.handelTranslateByUser);
router.post("/create-comment/:id", translateControllers.commentTransaction);
router.get("/getall-comment", translateControllers.getAllComment);
router.get("/getId-comment/:id", translateControllers.getIdComment);

export default router;
