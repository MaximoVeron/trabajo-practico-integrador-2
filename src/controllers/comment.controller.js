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
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await CommentModel.findByIdAndDelete(req.params.id);
    return res.status(204).json({ msg: "Comentario eliminado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
