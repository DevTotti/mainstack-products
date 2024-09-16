import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";
import UserControler from "./controller";
const userRouter = Router();

export default userRouter;
