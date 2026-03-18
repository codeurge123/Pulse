import express from "express";
import { getTopHeadlines } from "../controllers/news.controller.js";

const router = express.Router();

router.get("/", getTopHeadlines);

export default router;