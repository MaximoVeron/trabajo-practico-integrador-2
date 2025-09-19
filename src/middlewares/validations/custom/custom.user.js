import UserModel from "../../../models/user.model.js";

export const validateUserId = async (id) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

export const validateEmailUnique = async (email) => {
  const userEmail = await UserModel.findOne({
    email: email.toLowerCase(),
  });
  if (userEmail) {
    throw new Error(`El email ${email} ya está en uso`);
  }
};
