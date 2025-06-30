import { Router } from "express";
import controller from "../controllers/furniture.controller";
import { isAuthenticated, validateRequest } from "../middlewares";
import {
  createFurnitureValidation,
  updateFurnitureValidation,
  furnitureIdValidation,
} from "../validations";

const router = Router();

router.get("/", controller.getAllFurnitures);
router.get("/user", isAuthenticated, controller.getUserFurnitures);
router.get(
  "/:id",
  isAuthenticated,
  validateRequest({ params: furnitureIdValidation }),
  controller.getFurnitureById
);
router.post(
  "/",
  isAuthenticated,
  validateRequest({ body: createFurnitureValidation }),
  controller.createFurniture
);
router.put(
  "/:id",
  isAuthenticated,
  validateRequest({
    params: furnitureIdValidation,
    body: updateFurnitureValidation,
  }),
  controller.updateFurniture
);
router.delete(
  "/:id",
  isAuthenticated,
  validateRequest({ params: furnitureIdValidation }),
  controller.deleteFurniture
);

export default router;
