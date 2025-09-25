import { validationResult, matchedData } from "express-validator";

export const applyValidations = (req, res, next) => {
  console.log("APPLY VALIDATIONS");
  console.log("Llegó a applyValidations");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Retornando errores de validación");
    console.log("Errores encontrados:", errors.array());
    return res.status(400).json({
      message: "Errores de validación",
      errors: errors.array(),
    });
  } else {
    console.log("Errores encontrados: Ninguno");
  }

  req.validatedData = matchedData(req);
  next();
};
