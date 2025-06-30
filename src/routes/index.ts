import { Router } from "express";
import authRouter from "./auth.routes";
import furnitureRouter from "./furniture.routes";
import categoryRouter from "./category.routes";
import materialRouter from "./material.routes";
import supplierRouter from "./supplier.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Bienvenue sur l'API artisan app !");
});

router.use("/auth", authRouter);
router.use("/furniture", furnitureRouter);
router.use("/categories", categoryRouter);
router.use("/materials", materialRouter);
router.use("/suppliers", supplierRouter);

export default router;
