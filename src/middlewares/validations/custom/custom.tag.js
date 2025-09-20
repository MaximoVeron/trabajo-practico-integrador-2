import TagModel from "../../../models/tag.model.js";

export const validateTagExists = async (id) => {
  const tag = await TagModel.findById(id);
  if (!tag) {
    throw new Error("Etiqueta no encontrada");
  }
};

export const validateTagNameUnique = async (name) => {
  const tagName = await TagModel.findOne({
    name: name,
  });
  if (tagName) {
    throw new Error("El nombre de la etiqueta ya está en uso");
  }
};

export const validateUpdateTagNameUnique = async (name, { req }) => {
  const tagName = await TagModel.findOne({
    name: name,
  });
  if (tagName && tagName._id.toString() !== req.params.id) {
    throw new Error("El nombre de la etiqueta ya está en uso");
  }
};
