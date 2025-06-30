import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { APIResponse } from "../utils";

interface ValidateRequestOptions {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

export const validateRequest = (schemas: ValidateRequestOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }

      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }

      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return APIResponse(
          res,
          null,
          `Validation error: ${errorMessages.join(", ")}`,
          400
        );
      }

      return APIResponse(res, null, "Validation error", 400);
    }
  };
};
