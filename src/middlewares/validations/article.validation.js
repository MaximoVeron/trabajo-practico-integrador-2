import { body, param } from "express-validator";
import { validateUserExists } from "./custom/custom.user.js";
import {
  validateArticleExists,
  validateArticleTitleUnique,
  validateUpdateArticleTitleUnique,
} from "./custom/custom.article.js";

export const validateCreateArticle = [
  body("title")
    .isString()
    .withMessage("El título debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres")
    .custom(validateArticleTitleUnique)
    .trim()
    .escape(),
  body("content")
    .isString()
    .withMessage("El contenido debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres")
    .trim()
    .escape(),
  body("excerpt")
    .optional()
    .isString()
    .withMessage("El extracto debe ser una cadena de texto")
    .isLength({ max: 500 })
    .withMessage("El extracto no puede exceder los 500 caracteres")
    .trim()
    .escape(),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'"),
  body("author")
    .notEmpty()
    .withMessage("El autor es obligatorio")
    .isMongoId()
    .withMessage("El autor debe ser un ObjectId válido")
    .custom(validateUserExists),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Las etiquetas deben ser un array"),
  // .custom((tags) => {
  //   if (tags && tags.length > 0) {
  //     for (let tag of tags) {
  //       if (!tag.match(/^[0-9a-fA-F]{24}$/)) {
  //         throw new Error("Cada etiqueta debe ser un ObjectId válido");
  //       }
  //     }
  //   }
  //   return true;
  // }),
];

export const validateUpdateArticle = [
  body("title")
    .optional()
    .isString()
    .withMessage("El título debe ser una cadena de texto")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres")
    .custom(validateUpdateArticleTitleUnique)
    .trim()
    .escape(),
  body("content")
    .optional()
    .isString()
    .withMessage("El contenido debe ser una cadena de texto")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres")
    .trim()
    .escape(),
  body("excerpt")
    .optional()
    .isString()
    .withMessage("El extracto debe ser una cadena de texto")
    .isLength({ max: 500 })
    .withMessage("El extracto no puede exceder los 500 caracteres")
    .trim()
    .escape(),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'"),
  body("author")
    .optional()
    .isMongoId()
    .withMessage("El autor debe ser un ObjectId válido")
    .custom(validateUserExists),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Las etiquetas deben ser un array"),
  // .custom((tags) => {
  //   if (tags && tags.length > 0) {
  //     for (let tag of tags) {
  //       if (!tag.match(/^[0-9a-fA-F]{24}$/)) {
  //         throw new Error("Cada etiqueta debe ser un ObjectId válido");
  //       }
  //     }
  //   }
  //   return true;
  // }),
];

export const validateArticleId = [
  param("id")
    .isMongoId()
    .withMessage("El ID debe ser un ObjectId válido de MongoDB")
    .custom(validateArticleExists),
];
