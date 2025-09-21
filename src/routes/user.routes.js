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

const userRouter = Router();
// userRouter.use(authMiddleware); // Aplica el middleware de autenticación a todas las rutas de usuario
userRouter.post("/users", validateUserCreation, applyValidations, createUser);
userRouter.get("/users", getUser);
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
  validateUserUpdate,
  applyValidations,
  updateUser
);
userRouter.delete("/users/:id", validateUserId, applyValidations, deleteUser);

export default userRouter;
