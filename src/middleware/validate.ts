import { NextFunction, Response } from "express";
import { ObjectSchema } from "joi";
import { statusCode } from "../lib/httpstatuscode";

export const validateBody = (schemaObject: ObjectSchema) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const schema = schemaObject.options({ stripUnknown: false });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(statusCode.UNPROCESSABLE_ENTITY).json({
        error: {
          message: error.message,
        },
      });
    }
    return next();
  };
};
