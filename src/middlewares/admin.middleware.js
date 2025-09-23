export const isAdmin = async (req, res, next) => {
  const user = req.user;
  try {
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "No autorizado" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
