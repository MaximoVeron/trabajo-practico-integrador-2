import { body, param } from "express-validator";
import { validateUserId } from "./custom/custom.user.js";
import { validateCommentExists } from "./custom/custom.comment.js";
import { validateArticleExists } from "./custom/custom.article.js";

export const validateCreateComment = [
  body("content")
    .notEmpty()
    .withMessage("Debe ingresar el comentario")
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres"),
  body("author")
    .notEmpty()
    .withMessage("El autor es obligatorio")
    .isMongoId()
    .withMessage("Debe ingresar un id válido")
    .custom(validateUserId),
  body("article")
    .notEmpty()
    .withMessage("El comentario debe pertenecer a una publicación")
    .isMongoId()
    .withMessage("El artículo debe ser un ObjectId válido")
    .custom(validateArticleExists),
];

export const validateUpdateComment = [
  body("content")
    .optional()
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres"),
  body("author")
    .optional()
    .isMongoId()
    .withMessage("Debe ingresar un id válido")
    .custom(validateUserId),
  body("article")
    .optional()
    .isMongoId()
    .withMessage("El artículo debe ser un ObjectId válido")
    .custom(validateArticleExists),
];

export const validateCommentId = [
  param("id")
    .isMongoId()
    .withMessage("El ID debe ser un ObjectId válido de MongoDB")
    .custom(validateCommentExists),
];
