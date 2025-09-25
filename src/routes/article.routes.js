import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getMyArticles,
} from "../controllers/article.controller.js";
import { applyValidations } from "../middlewares/catch.validations.js";
import {
  validateCreateArticle,
  validateUpdateArticle,
  validateArticleId,
} from "../middlewares/validations/article.validation.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { isOwnerOrAdmin } from "../middlewares/ownerOrAdminMiddleware.js";

const articleRouter = Router();
articleRouter.use(authMiddleware); // Aplica el middleware de autenticación a todas las rutas
articleRouter.post(
  "/articles",
  validateCreateArticle,
  applyValidations,
  createArticle
);
articleRouter.get("/articles", authMiddleware, applyValidations, getArticles);

articleRouter.get("/articles/my", applyValidations, getMyArticles);

articleRouter.get("/articles/:id", validateArticleId, getArticleById);
articleRouter.put(
  "/articles/:id",
  validateArticleId,
  isOwnerOrAdmin,
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
