import ArticleModel from "../models/article.model.js";

export const createArticle = async (req, res) => {
  try {
    const newArticle = new ArticleModel(req.body);
    await newArticle.save();
    return res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const updateArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updateArticle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    await ArticleModel.findByIdAndDelete(req.params.id);
    return res.status(204).json({ msg: "Artículo eliminado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
