import { Request, Response } from "express";
import Supplier from "../models/Supplier";
import { APIResponse } from "../utils";
import logger from "../utils/logger";

const supplierController = {
  getAllSuppliers: async (req: Request, res: Response) => {
    try {
      logger.info("Tentative de récupération de tous les fournisseurs");

      const suppliers = await Supplier.find();

      logger.info(`Récupération réussie de ${suppliers.length} fournisseurs`);
      APIResponse(res, suppliers, "Suppliers fetched successfully", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des fournisseurs: ${err.message}`
      );
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },

  createSupplier: async (req: Request, res: Response) => {
    try {
      const { name, email, phone, address } = req.body;
      logger.info(`Tentative de création d'un nouveau fournisseur: ${name}`);

      const newSupplier = new Supplier({ name, email, phone, address });
      const savedSupplier = await newSupplier.save();

      logger.info(
        `Fournisseur créé avec succès: ${savedSupplier.name} (ID: ${savedSupplier._id})`
      );
      APIResponse(res, savedSupplier, "Supplier created successfully", 201);
    } catch (err: any) {
      logger.error(`Erreur lors de la création du fournisseur: ${err.message}`);
      APIResponse(res, null, "Erreur lors de la création du fournisseur", 400);
    }
  },
};

export default supplierController;
