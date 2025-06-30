import { Router } from "express";
import authRouter from "./auth.routes";
const router = Router();

router.get("/", (_req, res) => {
  res.send("Bienvenue sur l'API artisan app !");
});

router.use("/auth", authRouter);

export default router;
