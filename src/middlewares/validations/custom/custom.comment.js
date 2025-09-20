import CommentModel from "../../../models/comment.model.js";

export const validateCommentExists = async (id) => {
  const comment = await CommentModel.findById(id);
  if (!comment) {
    throw new Error("El comentario no existe");
  }
  return true;
};
