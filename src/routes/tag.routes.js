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

const tagRouter = Router();

tagRouter.post("/tags", validateTagCreation, applyValidations, createTag);
tagRouter.get("/tags", getTags);
tagRouter.get("/tags/:id", validateTagId, applyValidations, getTagById);
tagRouter.put("/tags/:id", validateTagUpdate, applyValidations, updateTag);
tagRouter.delete("/tags/:id", validateTagId, applyValidations, deleteTag);

export default tagRouter;
