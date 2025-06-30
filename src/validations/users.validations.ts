import { z } from "zod";

export const userRegisterValidation = z.object({
  email: z.string().trim().email({ message: "Adresse email invalide" }),

  password: z
    .string()
    .trim()
    .min(12, {
      message: "Votre mot de passe doit contenir au moins 12 caractères",
    })
    .regex(/[A-Z]/, {
      message: "Votre mot de passe doit contenir au moins une lettre majuscule",
    })
    .regex(/[0-9]/, {
      message: "Votre mot de passe doit contenir au moins un chiffre",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Votre mot de passe doit contenir au moins un caractère spécial",
    }),
});

export const userUpdateValidation = z.object({
  email: z.string().trim().email({ message: "Adresse email invalide" }),
});
