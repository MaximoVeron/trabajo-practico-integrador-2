import ArticleModel from "../../../models/article.model.js";

export const validateArticleExists = async (id) => {
  const article = await ArticleModel.findById(id);
  if (!article) {
    throw new Error("Artículo no encontrado");
  }
};

export const validateArticleTitleUnique = async (title) => {
  const articleTitle = await ArticleModel.findOne({
    title: title.toLowerCase(),
  });
  if (articleTitle) {
    throw new Error("El título del artículo debe ser único");
  }
};

export const validateUpdateArticleTitleUnique = async (title, { req }) => {
  const articleTitle = await ArticleModel.findOne({
    title: title.toLowerCase(),
  });
  if (articleTitle && articleTitle._id.toString() !== req.params.id) {
    throw new Error("El título del artículo debe ser único");
  }
};
