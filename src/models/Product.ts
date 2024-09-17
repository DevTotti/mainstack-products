import { Schema, model, Types } from "mongoose"; // Import necessary functions and types from Mongoose

// Define the schema for the Product model
const productSchema = new Schema({
  name: { type: String, required: true }, // Name of the product (required)
  description: { type: String }, // Optional description of the product
  price: { type: Number }, // Optional price of the product
  currency: { type: String }, // Optional currency for the price (e.g., USD, EUR)
  category: { type: String }, // Optional category of the product
  userId: { type: Types.ObjectId, ref: "User", required: true }, // Reference to the User model (required)
  createdAt: { type: Date, default: Date.now }, // Timestamp when the product was created (default to current date and time)
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the product was last updated (default to current date and time)
});

// Create the Product model from the schema
export const Product = model("Product", productSchema);
