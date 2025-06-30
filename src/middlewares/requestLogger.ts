import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  const method = request.method;
  const path = request.path;
  const ip = request.ip;

  console.log(`[${timestamp}] ${method} ${path} - IP: ${ip}`);

  next();
};
