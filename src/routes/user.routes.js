import { Router } from "express";
import {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserWithArticles,
} from "../controllers/user.controller.js";
import { applyValidations } from "../middlewares/catch.validations.js";
import {
  validateUserCreation,
  validateUserUpdate,
  validateUserId,
} from "../middlewares/validations/user.validation.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const userRouter = Router();
userRouter.use(authMiddleware);
userRouter.post("/users", validateUserCreation, applyValidations, createUser);
userRouter.get("/users", isAdmin, getUser);
userRouter.get("/users/:id", validateUserId, applyValidations, getUserById);
userRouter.get(
  "/users/:id/articles",
  validateUserId,
  applyValidations,
  getUserWithArticles
);
userRouter.put(
  "/users/:id",
  validateUserId,
  isAdmin,
  validateUserUpdate,
  applyValidations,
  updateUser
);
userRouter.delete("/users/:id", validateUserId, applyValidations, deleteUser);

export default userRouter;
