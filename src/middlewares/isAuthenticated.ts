import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { APIResponse } from "../utils";
import User from "../models/User";

const { JWT_SECRET } = env;

export const isAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { accessToken } = request.cookies;
  if (!accessToken)
    return APIResponse(response, null, "Vous devez être connecté", 401);

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      return APIResponse(response, null, "Utilisateur introuvable", 401);
    }
    response.locals.user = user;
    next();
  } catch (err: any) {
    return APIResponse(response, null, "Token invalide", 401);
  }
};
