import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";
import * as schema from "./schema";
import UserControler from "./controller";

const router = Router();

// Route for user registration
router.post(
  "/register",
  // Middleware to validate the request body against the user schema
  validateBody(schema.userSchema),
  // Controller method to handle registration
  UserControler.register,
);

// Route for user login
router.post(
  "/login",
  // Middleware to validate the request body against the user schema
  validateBody(schema.userSchema),
  // Controller method to handle login
  UserControler.login,
);

export default router;
