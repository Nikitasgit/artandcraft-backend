import { Router } from "express";
import controller from "../controllers/auth.controller";
import { isAuthenticated, validateRequest } from "../middlewares";
import { userLoginValidation, userRegisterValidation } from "../validations";

const router = Router();

router.post(
  "/login",
  validateRequest({ body: userLoginValidation }),
  controller.login
);

router.post(
  "/register",
  validateRequest({ body: userRegisterValidation }),
  controller.register
);

router.post("/logout", controller.logout);

router.get("/me", isAuthenticated, controller.me);

export default router;
