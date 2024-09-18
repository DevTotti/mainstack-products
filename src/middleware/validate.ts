import { NextFunction, Response } from "express"; // Import types for Express middleware
import { ObjectSchema } from "joi"; // Import ObjectSchema type from Joi for schema validation
import { statusCode } from "../lib/httpstatuscode"; // Import custom HTTP status codes

// Middleware function to validate request body against a Joi schema
export const validateBody = (schemaObject: ObjectSchema) => {
  return async (req: any, res: Response, next: NextFunction) => {
    // Create a schema with options to not strip unknown keys
    const schema = schemaObject.options({ stripUnknown: false });

    // Validate the request body against the schema
    const { error } = schema.validate(req.body);

    // If validation fails, respond with a 422 Unprocessable Entity status and error message
    if (error) {
      return res.status(statusCode.UNPROCESSABLE_ENTITY).json({
        error: {
          message: error.message,
        },
      });
    }

    // If validation passes, proceed to the next middleware or route handler
    return next();
  };
};

// Middleware function to validate query parameters or route parameters against a Joi schema
export const validateQueryOrParams = (
  schema: ObjectSchema, // Joi schema for validation
  query: boolean = false, // Flag to indicate whether to validate query parameters (true) or route parameters (false)
) => {
  return (req: any, res: Response, next: NextFunction) => {
    // Select either query parameters or route parameters based on the 'query' flag
    const path = query ? req.query : req.params;

    // Validate the selected parameters against the schema
    const { error } = schema.validate(path);

    // If validation fails, respond with a 422 Unprocessable Entity status and error message
    if (error)
      return res
        .status(statusCode.UNPROCESSABLE_ENTITY)
        .json({ error: { message: error.message } });

    // If validation passes, proceed to the next middleware or route handler
    return next();
  };
};
