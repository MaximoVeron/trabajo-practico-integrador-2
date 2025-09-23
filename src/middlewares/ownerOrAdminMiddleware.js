import ArticleModel from "../models/article.model.js";

export const isOwnerOrAdmin = async (req, res, next) => {
  const user = req.user;
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (article.author !== user.id && user.role !== "admin") {
      return res.status(403).json({ msg: "No autorizado" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
