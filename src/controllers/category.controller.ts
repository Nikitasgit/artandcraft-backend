import { Request, Response } from "express";
import Category from "../models/Category";
import { APIResponse } from "../utils";
import logger from "../utils/logger";

const categoryController = {
  getAllCategories: async (req: Request, res: Response) => {
    try {
      logger.info("Tentative de récupération de toutes les catégories");

      const categories = await Category.find();

      logger.info(`Récupération réussie de ${categories.length} catégories`);
      APIResponse(res, categories, "Categories fetched successfully", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des catégories: ${err.message}`
      );
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },

  createCategory: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      logger.info(`Tentative de création d'une nouvelle catégorie: ${name}`);

      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();

      logger.info(
        `Catégorie créée avec succès: ${savedCategory.name} (ID: ${savedCategory._id})`
      );
      APIResponse(res, savedCategory, "Category created successfully", 201);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de la catégorie: ${err.message}`
      );
      APIResponse(res, null, "Erreur lors de la création de la catégorie", 400);
    }
  },
};

export default categoryController;
