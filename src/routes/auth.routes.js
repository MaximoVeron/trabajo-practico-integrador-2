import { Router } from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/auth.controller.js";
import { validateUserCreation } from "../middlewares/validations/user.validation.js";
import { applyValidations } from "../middlewares/catch.validations.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.post(
  "/auth/register",
  validateUserCreation,
  applyValidations,
  registerUser
);
authRouter.post("/auth/login", loginUser);
authRouter.post("/auth/logout", authMiddleware, logout);

export default authRouter;
