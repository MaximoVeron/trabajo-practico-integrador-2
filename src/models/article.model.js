import { model, Schema, Types } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: [3, "El título debe tener al menos 3 caracteres"],
      max: [200, "El título no puede exceder los 200 caracteres"],
      trim: true,
    },
    content: {
      type: String,
      required: true,
      min: [50, "El contenido debe tener al menos 50 caracteres"],
      trim: true,
    },
    excerpt: {
      type: String,
      required: false,
      max: [500, "El extracto no puede exceder los 500 caracteres"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["published", "archived"],
      default: "published",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ArticleModel = model("Article", ArticleSchema);
export default ArticleModel;
