import { Request, Response } from "express";
import Material from "../models/Material";
import { APIResponse } from "../utils";
import logger from "../utils/logger";

const materialController = {
  getAllMaterials: async (req: Request, res: Response) => {
    try {
      logger.info("Tentative de récupération de tous les matériaux");

      const materials = await Material.find().populate("supplier");

      logger.info(`Récupération réussie de ${materials.length} matériaux`);
      APIResponse(res, materials, "Materials fetched successfully", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des matériaux: ${err.message}`
      );
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },

  getMaterialByKeyword: async (req: Request, res: Response) => {
    try {
      const { keyword } = req.params;
      console.log(keyword);

      if (!keyword) {
        return APIResponse(res, null, "Mot-clé requis", 400);
      }

      logger.info(`Recherche du matériau avec le mot-clé: ${keyword}`);

      const material = await Material.findOne({
        keywords: { $regex: keyword, $options: "i" },
      }).populate("supplier");

      if (!material) {
        logger.warn(`Aucun matériau trouvé avec le mot-clé: ${keyword}`);
        return APIResponse(res, null, "Matériau non trouvé", 404);
      }

      logger.info(`Matériau trouvé: ${material.name} (ID: ${material._id})`);
      console.log(material);
      APIResponse(res, material, `Material found for keyword: ${keyword}`, 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la recherche du matériau par mot-clé: ${err.message}`
      );
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },

  createMaterial: async (req: Request, res: Response) => {
    try {
      const { name, description, keywords, supplier } = req.body;
      logger.info(`Tentative de création d'un nouveau matériau: ${name}`);

      const newMaterial = new Material({
        name,
        description,
        keywords: keywords || [],
        supplier,
      });
      const savedMaterial = await newMaterial.save();

      logger.info(
        `Matériau créé avec succès: ${savedMaterial.name} (ID: ${savedMaterial._id})`
      );
      APIResponse(res, savedMaterial, "Material created successfully", 201);
    } catch (err: any) {
      logger.error(`Erreur lors de la création du matériau: ${err.message}`);
      APIResponse(res, null, "Erreur lors de la création du matériau", 400);
    }
  },
};

export default materialController;
