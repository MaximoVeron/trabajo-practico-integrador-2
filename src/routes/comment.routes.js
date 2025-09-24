import { Router } from "express";
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByUser,
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

commentRouter.post(
  "/comments",
  authMiddleware,
  validateCreateComment,
  applyValidations,
  createComment
);
commentRouter.get("/comments", getComments);
commentRouter.get(
  "/comments/:id",
  authMiddleware,
  validateCommentId,
  applyValidations,
  getCommentById
);
commentRouter.get("/comments/my", authMiddleware, getCommentsByUser);
commentRouter.put(
  "/comments/:id",
  authMiddleware,
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
