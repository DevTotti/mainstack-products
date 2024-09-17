import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import { validateBody, validateQueryOrParams } from "../../middleware/validate";
import ProductController from "./controller";
import * as schema from "./schema";

// Create a new Router instance
const router = Router();

// Route to fetch a single public product by ID
// No authentication required
router.get("/public/:id", ProductController.getOnePublic);

// Route to fetch all public products
// Validates query parameters using schema.validateProductQuery
router.get(
  "/public",
  validateQueryOrParams(schema.validateProductQuery),
  ProductController.getPublic,
);

// Route to fetch a single product by ID for authenticated users
// Authentication is required
router.get("/:id", authenticate, ProductController.getOne);

// Route to update a single product by ID for authenticated users
// Validates request body using schema.productSchema
// Authentication is required
router.put(
  "/:id",
  validateBody(schema.productSchema),
  authenticate,
  ProductController.updateOne,
);

// Route to delete a single product by ID for authenticated users
// Authentication is required
router.delete("/:id", authenticate, ProductController.deleteOne);

// Route to fetch all products for authenticated users
// Validates query parameters using schema.validateProductQuery
// Authentication is required
router.get(
  "/",
  authenticate,
  validateQueryOrParams(schema.validateProductQuery),
  ProductController.get,
);

// Route to create a new product for authenticated users
// Validates request body using schema.productSchema
// Authentication is required
router.post(
  "/",
  authenticate,
  validateBody(schema.productSchema),
  ProductController.create,
);

// Export the router to be used in other parts of the application
export default router;
