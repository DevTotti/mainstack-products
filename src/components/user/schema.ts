import Joi from "joi";

// Schema for validating user-related data
export const userSchema = Joi.object({
  // Username field must be a string and is required
  username: Joi.string().required(),

  // Password field must be a string, at least 6 characters long, and is required
  password: Joi.string().min(6).required(),
});
