import ArticleModel from "../models/article.model.js";
import CommentModel from "../models/comment.model.js";

export const createArticle = async (req, res) => {
  try {
    const newArticle = new ArticleModel({
      ...req.validatedData,
      author: req.user.id,
    });
    await newArticle.save();
    return res.status(201).json(newArticle);
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate({
        path: "author",
        select: "username email",
      })
      .populate("tags", "name");
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const updateArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.validatedData,
      { new: true }
    );
    return res.status(200).json(updateArticle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    // 1. Primero eliminar todos los comentarios del artículo
    await CommentModel.deleteMany({ article: articleId });
    // 2. Luego eliminar el artículo
    await ArticleModel.findByIdAndDelete(articleId);
    return res.status(204).json({ msg: "Artículo eliminado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getArticlesByUser = async (req, res) => {
  try {
    const articles = await ArticleModel.find({ author: req.user.id });
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }
    const articles = await ArticleModel.find({ author: req.user.id }).populate(
      "tags",
      "name"
    );
    return res.status(200).json({
      message: "Artículos del usuario",
      count: articles.length,
      articles: articles,
    });
  } catch (error) {
    console.error("Error en getMyArticles:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
