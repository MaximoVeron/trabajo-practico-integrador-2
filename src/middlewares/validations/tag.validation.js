import { body, param } from "express-validator";
import {
  validateTagExists,
  validateTagNameUnique,
  validateUpdateTagNameUnique,
} from "./custom/custom.tag.js";

export const validateTagCreation = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .matches(/^\S*$/)
    .withMessage("El nombre no puede contener espacios")
    .custom(validateTagNameUnique)
    .trim()
    .escape(),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 200 })
    .withMessage("La descripción no puede exceder los 200 caracteres")
    .trim()
    .escape(),
];

export const validateTagUpdate = [
  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .matches(/^\S*$/)
    .withMessage("El nombre no puede contener espacios")
    .custom(validateUpdateTagNameUnique)
    .trim()
    .escape(),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 200 })
    .withMessage("La descripción no puede exceder los 200 caracteres")
    .trim()
    .escape(),
];

export const validateTagId = [
  param("id")
    .isMongoId()
    .withMessage("El ID debe ser un ObjectId válido de MongoDB")
    .custom(validateTagExists),
];
