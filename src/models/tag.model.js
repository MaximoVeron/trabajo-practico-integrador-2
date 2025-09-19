import { model, Schema } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: [2, "El nombre debe tener al menos 2 caracteres"],
      max: [30, "El nombre no puede exceder los 30 caracteres"],
      trim: true,
      match: [/^\S*$/, "El nombre no puede contener espacios"],
    },
    description: {
      type: String,
      required: false,
      max: [200, "La descripción no puede exceder los 200 caracteres"],
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TagModel = model("Tag", TagSchema);
export default TagModel;
