import { Router } from "express";
import controller from "../controllers/supplier.controller";

const router = Router();

router.get("/", controller.getAllSuppliers);
router.post("/", controller.createSupplier);

export default router;
