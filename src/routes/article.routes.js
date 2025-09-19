import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

const articleRouter = Router();

articleRouter.post("/articles", createArticle);
articleRouter.get("/articles", getArticles);
articleRouter.get("/articles/:id", getArticleById);
articleRouter.put("/articles/:id", updateArticle);
articleRouter.delete("/articles/:id", deleteArticle);

export default articleRouter;
