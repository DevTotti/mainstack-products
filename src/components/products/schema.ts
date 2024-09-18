import Joi from "joi";

// Define the schema for validating product creation and updates
// Uses Joi for schema validation

// Schema for validating product data
export const productSchema = Joi.object({
  name: Joi.string().required(), // Product name, required, must be a string
  description: Joi.string(), // Product description, optional, must be a string
  price: Joi.number(), // Product price, optional, must be a number
  currency: Joi.string().valid("NGN", "USD"), // Currency, optional, must be either "NGN" or "USD"
  category: Joi.string().valid("good", "service"), // Category, optional, must be either "good" or "service"
});

// Schema for validating query parameters when fetching products
export const validateProductQuery = Joi.object({
  name: Joi.string(), // Product name, optional, must be a string
  currency: Joi.string(), // Currency, optional, must be a string
  category: Joi.string(), // Category, optional, must be a string
  minPrice: Joi.number(), // Minimum price filter, optional, must be a number
  maxPrice: Joi.number(), // Maximum price filter, optional, must be a number
  from: Joi.date(), // Start date for date range filter, optional, must be a valid date
  to: Joi.date(), // End date for date range filter, optional, must be a valid date
});
