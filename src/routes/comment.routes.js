import { Router } from "express";
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { applyValidations } from "../middlewares/catch.validations.js";
import {
  validateCreateComment,
  validateUpdateComment,
  validateCommentId,
} from "../middlewares/validations/comment.validation.js";

const commentRouter = Router();

commentRouter.post(
  "/comments",
  validateCreateComment,
  applyValidations,
  createComment
);
commentRouter.get("/comments", getComments);
commentRouter.get(
  "/comments/:id",
  validateCommentId,
  applyValidations,
  getCommentById
);
commentRouter.put(
  "/comments/:id",
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
