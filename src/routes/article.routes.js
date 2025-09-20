import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { applyValidations } from "../middlewares/catch.validations.js";
import {
  validateCreateArticle,
  validateUpdateArticle,
  validateArticleId,
} from "../middlewares/validations/article.validation.js";

const articleRouter = Router();

articleRouter.post(
  "/articles",
  validateCreateArticle,
  applyValidations,
  createArticle
);
articleRouter.get("/articles", getArticles);
articleRouter.get(
  "/articles/:id",
  validateArticleId,
  applyValidations,
  getArticleById
);
articleRouter.put(
  "/articles/:id",
  validateArticleId,
  validateUpdateArticle,
  applyValidations,
  updateArticle
);
articleRouter.delete(
  "/articles/:id",
  validateArticleId,
  applyValidations,
  deleteArticle
);

export default articleRouter;
