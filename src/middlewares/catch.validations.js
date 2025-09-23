import { validationResult, matchedData } from "express-validator";

export const applyValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Errores de validación",
      errors: errors.array(),
    });
  }
  req.validatedData = matchedData(req);
  next();
};
