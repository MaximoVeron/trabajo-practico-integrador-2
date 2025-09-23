import { Router } from "express";
import userRouter from "./user.routes.js";
import articleRouter from "./article.routes.js";
import tagRouter from "./tag.routes.js";
import commentRouter from "./comment.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();
router.use(userRouter);
router.use(articleRouter);
router.use(tagRouter);
router.use(authRouter);
router.use(commentRouter);
export default router;
