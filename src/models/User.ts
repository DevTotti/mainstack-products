import { Schema, model } from "mongoose"; // Import necessary functions from Mongoose
import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords

// Define the schema for the User model
const userSchema = new Schema({
  username: { type: String, required: true, unique: true }, // Username of the user (required and must be unique)
  password: { type: String, required: true }, // Password of the user (required)
  createdAt: { type: Date, default: Date.now }, // Timestamp when the user was created (default to current date and time)
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the user was last updated (default to current date and time)
});

// Pre-save hook to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  const user = this as any; // Type assertion to access 'password' property

  // If the password field is not modified, proceed to the next middleware
  if (!user.isModified("password")) return next();

  // Hash the password with bcrypt before saving
  user.password = await bcrypt.hash(user.password, 10);

  // Proceed to the next middleware or save operation
  next();
});

// Create the User model from the schema
export const User = model("User", userSchema);
