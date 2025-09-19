import { Router } from "express";
import {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();
// userRouter.use(authMiddleware); // Aplica el middleware de autenticación a todas las rutas de usuario
userRouter.post("/users", createUser);
userRouter.get("/users", getUser);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
