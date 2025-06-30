import { z } from "zod";

const passwordValidation = z
  .string()
  .trim()
  .min(12, {
    message: "Votre mot de passe doit contenir au moins 12 caractères",
  })
  .max(128, {
    message: "Votre mot de passe ne peut pas dépasser 128 caractères",
  })
  .regex(/[A-Z]/, {
    message: "Votre mot de passe doit contenir au moins une lettre majuscule",
  })
  .regex(/[0-9]/, {
    message: "Votre mot de passe doit contenir au moins un chiffre",
  })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "Votre mot de passe doit contenir au moins un caractère spécial",
  });

const emailValidation = z
  .string()
  .trim()
  .email({ message: "Adresse email invalide" })
  .max(254, { message: "L'adresse email ne peut pas dépasser 254 caractères" })
  .toLowerCase();

export const userRegisterValidation = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const userLoginValidation = z.object({
  email: emailValidation,
  password: z
    .string()
    .trim()
    .min(1, { message: "Le mot de passe est requis" })
    .max(128, {
      message: "Le mot de passe ne peut pas dépasser 128 caractères",
    }),
});

export const userUpdateValidation = z.object({
  email: emailValidation.optional(),
  password: passwordValidation.optional(),
  userType: z
    .enum(["user", "admin"], {
      message: "Le type d'utilisateur doit être 'user' ou 'admin'",
    })
    .optional(),
});

export const userIdValidation = z.object({
  id: z.string().trim().min(1, { message: "L'ID de l'utilisateur est requis" }),
});

export type UserRegisterInput = z.infer<typeof userRegisterValidation>;
export type UserLoginInput = z.infer<typeof userLoginValidation>;
export type UserUpdateInput = z.infer<typeof userUpdateValidation>;
export type UserIdParams = z.infer<typeof userIdValidation>;
