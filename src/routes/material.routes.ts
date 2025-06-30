import { Router } from "express";
import controller from "../controllers/material.controller";

const router = Router();

router.get("/", controller.getAllMaterials);
router.get("/keyword/:keyword", controller.getMaterialByKeyword);
router.post("/", controller.createMaterial);

export default router;
