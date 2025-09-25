import { Router } from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { applyValidations } from "../middlewares/catch.validations.js";
import {
  validateTagCreation,
  validateTagUpdate,
  validateTagId,
} from "../middlewares/validations/tag.validation.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const tagRouter = Router();
tagRouter.use(authMiddleware);
tagRouter.post(
  "/tags",
  isAdmin,
  validateTagCreation,
  applyValidations,
  createTag
);
tagRouter.get("/tags", authMiddleware, getTags);
tagRouter.get("/tags/:id", validateTagId, applyValidations, getTagById);
tagRouter.put(
  "/tags/:id",
  validateTagUpdate,
  isAdmin,
  applyValidations,
  updateTag
);
tagRouter.delete(
  "/tags/:id",
  validateTagId,
  isAdmin,
  applyValidations,
  deleteTag
);

export default tagRouter;
