import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
      max: [30, "El nombre de usuario no puede exceder los 30 caracteres"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      first_name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        min: [2, "El nombre debe tener al menos 2 caracteres"],
        max: [50, "El nombre no puede exceder los 50 caracteres"],
      },
      last_name: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true,
        min: [2, "El apellido debe tener al menos 2 caracteres"],
        max: [50, "El apellido no puede exceder los 50 caracteres"],
      },
      biography: {
        type: String,
        max: [500, "La biografía no puede exceder los 500 caracteres"],
        required: false,
        trim: true,
      },
      avatar_url: {
        type: String,
        required: false,
      },
      birth_date: {
        type: Date,
        required: false,
      },
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual para obtener los artículos del usuario
UserSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

const UserModel = model("User", UserSchema);
export default UserModel;
