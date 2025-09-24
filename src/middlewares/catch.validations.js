import { validationResult, matchedData } from "express-validator";

export const applyValidations = (req, res, next) => {
  console.log("=== DEBUG APPLY VALIDATIONS ===");
  console.log("Llegó a applyValidations");

  const errors = validationResult(req);
  console.log(
    "Errores encontrados:",
    !errors.isEmpty() ? errors.array() : "Ninguno"
  );

  if (!errors.isEmpty()) {
    console.log("Retornando errores de validación:", errors.array());
    return res.status(400).json({
      message: "Errores de validación",
      errors: errors.array(),
    });
  }

  try {
    req.validatedData = matchedData(req);
    console.log("Datos validados:", req.validatedData);
    console.log("Pasando al siguiente middleware/controlador");
    next();
  } catch (error) {
    console.error("ERROR EN APPLY VALIDATIONS:", error);
    return res.status(500).json({ message: "Error en validaciones" });
  }
};
