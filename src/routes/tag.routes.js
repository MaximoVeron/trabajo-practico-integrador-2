import { Router } from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";

const tagRouter = Router();

tagRouter.post("/tags", createTag);
tagRouter.get("/tags", getTags);
tagRouter.get("/tags/:id", getTagById);
tagRouter.put("/tags/:id", updateTag);
tagRouter.delete("/tags/:id", deleteTag);

export default tagRouter;
