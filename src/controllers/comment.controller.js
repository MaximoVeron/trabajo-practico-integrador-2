import CommentModel from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const newComment = new CommentModel({
      ...req.validatedData,
      author: req.user.id,
    });
    await newComment.save();
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const updateComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      req.validatedData,
      { new: true }
    );
    return res.status(200).json(updateComment);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await CommentModel.findByIdAndDelete(req.params.id);
    return res.status(204).json({ msg: "Comentario eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getCommentsByUser = async (req, res) => {
  try {
    const comments = await CommentModel.find({ author: req.user.id })
      .populate({
        path: "author",
        select: "username email createdAt",
      })
      .populate({
        path: "article",
        select: "title",
        populate: {
          path: "tags",
          select: "name",
        },
      });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/comments/article/:articleId → Listar comentarios de un artículo con
// populate de author. (usuario autenticado)
export const getCommentsByArticle = async (req, res) => {
  try {
    const comments = await CommentModel.find({
      article: req.params.articleId,
    }).populate("author", "username");
    return res.status(200).json({
      message: "Comentarios del artículo",
      articleId: req.params.articleId,
      count: comments.length,
      comments: comments,
    });
  } catch (error) {
    console.error("Error en getCommentsByArticle:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
