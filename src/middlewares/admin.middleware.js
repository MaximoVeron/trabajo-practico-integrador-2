export const isAdmin = async (req, res, next) => {
  console.log("=== DEBUG ADMIN MIDDLEWARE ===");
  console.log("req.user completo:", req.user);

  const user = req.user;
  try {
    console.log("Rol del usuario:", user?.role);

    if (user.role !== "admin") {
      console.log("Usuario no es admin, rechazando");
      return res.status(403).json({ msg: "No autorizado" });
    }

    console.log("Usuario es admin, pasando al siguiente middleware");
    next();
  } catch (error) {
    console.error("ERROR EN ADMIN MIDDLEWARE:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
