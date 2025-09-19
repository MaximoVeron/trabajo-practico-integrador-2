import { Router } from "express";
import {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.get("/users", getUser);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
