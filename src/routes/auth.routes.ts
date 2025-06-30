import { Router } from "express";
import controller from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares";

const router = Router();

router.post("/login", controller.login);

router.post("/register", controller.register);

router.post("/logout", controller.logout);

router.get("/me", isAuthenticated, controller.me);

export default router;
