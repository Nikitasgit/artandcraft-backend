import { z } from "zod";
const materialItemValidation = z.object({
  material: z
    .string()
    .trim()
    .min(1, { message: "L'ID du matériau est requis" }),
  quantity: z
    .number()
    .int()
    .positive({ message: "La quantité doit être un nombre positif" }),
});

export const createFurnitureValidation = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Le nom du meuble est requis" })
    .max(100, {
      message: "Le nom du meuble ne peut pas dépasser 100 caractères",
    }),

  category: z.string().trim().min(1, { message: "La catégorie est requise" }),

  materials: z
    .array(materialItemValidation)
    .min(1, { message: "Au moins un matériau est requis" })
    .max(50, { message: "Le nombre maximum de matériaux est de 50" }),

  keywords: z
    .array(z.string().trim().min(1).max(50))
    .max(20, { message: "Le nombre maximum de mots-clés est de 20" })
    .optional()
    .default([]),

  quantity: z
    .number()
    .int()
    .positive({ message: "La quantité doit être un nombre positif" })
    .max(1000, { message: "La quantité ne peut pas dépasser 1000" })
    .optional()
    .default(1),
});

export const updateFurnitureValidation = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Le nom du meuble est requis" })
    .max(100, {
      message: "Le nom du meuble ne peut pas dépasser 100 caractères",
    })
    .optional(),

  category: z
    .string()
    .trim()
    .min(1, { message: "La catégorie est requise" })
    .optional(),

  materials: z
    .array(materialItemValidation)
    .min(1, { message: "Au moins un matériau est requis" })
    .max(50, { message: "Le nombre maximum de matériaux est de 50" })
    .optional(),

  keywords: z
    .array(z.string().trim().min(1).max(50))
    .max(20, { message: "Le nombre maximum de mots-clés est de 20" })
    .optional(),

  quantity: z
    .number()
    .int()
    .positive({ message: "La quantité doit être un nombre positif" })
    .max(1000, { message: "La quantité ne peut pas dépasser 1000" })
    .optional(),
});

export const furnitureIdValidation = z.object({
  id: z.string().trim().min(1, { message: "L'ID du meuble est requis" }),
});

export type CreateFurnitureInput = z.infer<typeof createFurnitureValidation>;
export type UpdateFurnitureInput = z.infer<typeof updateFurnitureValidation>;
export type FurnitureIdParams = z.infer<typeof furnitureIdValidation>;
