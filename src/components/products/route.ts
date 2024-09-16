import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";
import ProductControler from "./controller";
import * as schema from "./schema";

const router = Router();

router.post(
  "/",
  authenticate,
  validateBody(schema.productSchema),
  ProductControler.create
);
router.get("/", authenticate, ProductControler.get);
router.get("/public", ProductControler.getPublic);
router.get("/:id", authenticate, ProductControler.getOne);
router.put(
  "/:id",
  validateBody(schema.productSchema),
  authenticate,
  ProductControler.updateOne
);
router.delete("/:id", authenticate, ProductControler.deleteOne);
export default router;
