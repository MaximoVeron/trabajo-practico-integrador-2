import { model, Schema, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      min: [5, "El contenido debe tener al menos 5 caracteres"],
      max: [500, "El contenido no puede exceder los 500 caracteres"],
      trim: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    article: {
      type: Types.ObjectId,
      ref: "Article",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);
export default CommentModel;
