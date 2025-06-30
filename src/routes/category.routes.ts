import { Router } from "express";
import controller from "../controllers/category.controller";

const router = Router();

router.get("/", controller.getAllCategories);
router.post("/", controller.createCategory);

export default router;
