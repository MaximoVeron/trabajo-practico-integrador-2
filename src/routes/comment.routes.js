import { Router } from "express";
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByUser,
  getCommentsByArticle,
} from "../controllers/comment.controller.js";
import { applyValidations } from "../middlewares/catch.validations.js";
import {
  validateCreateComment,
  validateUpdateComment,
  validateCommentId,
} from "../middlewares/validations/comment.validation.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { isOwnerOrAdmin } from "../middlewares/ownerOrAdminMiddleware.js";

const commentRouter = Router();
commentRouter.use(authMiddleware);
commentRouter.post(
  "/comments",
  validateCreateComment,
  applyValidations,
  createComment
);
commentRouter.get("/comments", getComments);
commentRouter.get("/comments/my", getCommentsByUser);
commentRouter.get(
  "/comments/article/:articleId",
  authMiddleware,
  getCommentsByArticle
);
commentRouter.get(
  "/comments/:id",
  validateCommentId,
  applyValidations,
  getCommentById
);
commentRouter.put(
  "/comments/:id",
  isOwnerOrAdmin,
  validateUpdateComment,
  applyValidations,
  updateComment
);
commentRouter.delete(
  "/comments/:id",
  validateCommentId,
  applyValidations,
  deleteComment
);

export default commentRouter;
