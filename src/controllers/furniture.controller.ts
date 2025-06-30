import { Request, Response } from "express";
import Furniture from "../models/Furniture";
import { APIResponse } from "../utils";
import logger from "../utils/logger";
import Category from "../models/Category";
import Material from "../models/Material";
import type {
  CreateFurnitureInput,
  UpdateFurnitureInput,
} from "../validations";

const furnitureController = {
  getAllFurnitures: async (req: Request, res: Response) => {
    try {
      logger.info("Tentative de récupération de tous les meubles");

      const furnitures = await Furniture.find()
        .populate("category")
        .populate({
          path: "materials.material",
          populate: {
            path: "supplier",
            model: "Supplier",
          },
        })
        .populate("keywords");

      logger.info(`Récupération réussie de ${furnitures.length} meubles`);
      APIResponse(res, furnitures, "Furnitures fetched successfully", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des meubles: ${err.message}`
      );
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },

  getUserFurnitures: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.user?._id;
      if (!userId) {
        return APIResponse(res, null, "Utilisateur non authentifié", 401);
      }

      logger.info(
        `Tentative de récupération des meubles pour l'utilisateur: ${userId}`
      );

      const furnitures = await Furniture.find({ user: userId })
        .populate("category")
        .populate({
          path: "materials.material",
          populate: {
            path: "supplier",
            model: "Supplier",
          },
        })
        .populate("keywords");

      logger.info(
        `Récupération réussie de ${furnitures.length} meubles pour l'utilisateur`
      );
      APIResponse(res, furnitures, "User furnitures fetched successfully", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des meubles de l'utilisateur: ${err.message}`
      );
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },

  getFurnitureById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user?._id;
      logger.info(`Tentative de récupération du meuble avec l'ID: ${id}`);

      const furniture = await Furniture.findById(id)
        .populate("category")
        .populate({
          path: "materials.material",
          populate: {
            path: "supplier",
            model: "Supplier",
          },
        })
        .populate("keywords");

      if (!furniture) {
        logger.warn(`Meuble non trouvé avec l'ID: ${id}`);
        return APIResponse(res, null, "Furniture not found", 404);
      }

      if (furniture.user.toString() !== userId.toString()) {
        logger.warn(
          `Accès non autorisé au meuble ${id} par l'utilisateur ${userId}`
        );
        return APIResponse(res, null, "Forbidden", 403);
      }

      logger.info(`Meuble récupéré avec succès: ${furniture.name} (ID: ${id})`);
      APIResponse(res, furniture, "Furniture fetched successfully", 200);
    } catch (err: any) {
      logger.error(`Erreur lors de la récupération du meuble: ${err.message}`);
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },

  createFurniture: async (req: Request, res: Response) => {
    try {
      const validatedData = req.body as CreateFurnitureInput;
      const userId = res.locals.user?._id;

      if (!userId) {
        return APIResponse(res, null, "Utilisateur non authentifié", 401);
      }

      logger.info(
        `Tentative de création d'un nouveau meuble: ${validatedData.name}`
      );

      const categoryId = await Category.findById(validatedData.category);
      if (!categoryId) {
        return APIResponse(res, null, "Catégorie non trouvée", 404);
      }

      const materialIds = validatedData.materials.map((m) => m.material);
      const existingMaterials = await Material.find({
        _id: { $in: materialIds },
      });

      if (existingMaterials.length !== materialIds.length) {
        return APIResponse(res, null, "Certains matériaux n'existent pas", 400);
      }

      const newFurniture = new Furniture({
        name: validatedData.name,
        category: categoryId._id,
        materials: validatedData.materials,
        keywords: validatedData.keywords || [],
        quantity: validatedData.quantity || 1,
        user: userId,
      });

      const savedFurniture = await newFurniture.save();

      logger.info(
        `Meuble créé avec succès: ${savedFurniture.name} (ID: ${savedFurniture._id})`
      );
      APIResponse(res, savedFurniture, "Furniture created successfully", 201);
    } catch (err: any) {
      logger.error(`Erreur lors de la création du meuble: ${err.message}`);
      APIResponse(res, null, "Erreur lors de la création du meuble", 400);
    }
  },

  updateFurniture: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const validatedData = req.body as UpdateFurnitureInput;
      const userId = res.locals.user?._id;
      logger.info(`Tentative de mise à jour du meuble avec l'ID: ${id}`);

      const furniture = await Furniture.findById(id);
      if (!furniture) {
        logger.warn(`Meuble non trouvé pour la mise à jour avec l'ID: ${id}`);
        return APIResponse(res, null, "Furniture not found", 404);
      }
      if (furniture.user.toString() !== userId.toString()) {
        logger.warn(
          `Mise à jour non autorisée du meuble ${id} par l'utilisateur ${userId}`
        );
        return APIResponse(res, null, "Forbidden", 403);
      }

      if (validatedData.category) {
        const categoryId = await Category.findById(validatedData.category);
        if (!categoryId) {
          return APIResponse(res, null, "Catégorie non trouvée", 404);
        }
      }

      if (validatedData.materials) {
        const materialIds = validatedData.materials.map((m) => m.material);
        const existingMaterials = await Material.find({
          _id: { $in: materialIds },
        });

        if (existingMaterials.length !== materialIds.length) {
          return APIResponse(
            res,
            null,
            "Certains matériaux n'existent pas",
            400
          );
        }
      }

      const updated = await Furniture.findByIdAndUpdate(id, validatedData, {
        new: true,
      });

      logger.info(
        `Meuble mis à jour avec succès: ${updated?.name} (ID: ${id})`
      );
      APIResponse(res, updated, "Furniture updated successfully", 200);
    } catch (err: any) {
      logger.error(`Erreur lors de la mise à jour du meuble: ${err.message}`);
      APIResponse(res, null, "Erreur lors de la mise à jour du meuble", 400);
    }
  },

  deleteFurniture: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user?._id;
      logger.info(`Tentative de suppression du meuble avec l'ID: ${id}`);

      const furniture = await Furniture.findById(id);
      if (!furniture) {
        logger.warn(`Meuble non trouvé pour la suppression avec l'ID: ${id}`);
        return APIResponse(res, null, "Furniture not found", 404);
      }
      if (furniture.user.toString() !== userId.toString()) {
        logger.warn(
          `Suppression non autorisée du meuble ${id} par l'utilisateur ${userId}`
        );
        return APIResponse(res, null, "Forbidden", 403);
      }

      await Furniture.findByIdAndDelete(id);

      logger.info(`Meuble supprimé avec succès: ${furniture.name} (ID: ${id})`);
      APIResponse(res, null, "Furniture deleted successfully", 200);
    } catch (err: any) {
      logger.error(`Erreur lors de la suppression du meuble: ${err.message}`);
      APIResponse(res, null, "Erreur lors de la suppression du meuble", 400);
    }
  },
};

export default furnitureController;
