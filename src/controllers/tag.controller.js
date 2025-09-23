import TagModel from "../models/tag.model.js";
import ArticleModel from "../models/article.model.js";

export const createTag = async (req, res) => {
  try {
    const newTag = new TagModel(req.validatedData);
    await newTag.save();
    return res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.find();
    return res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTagById = async (req, res) => {
  try {
    const tag = await TagModel.findById(req.params.id);
    return res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTag = async (req, res) => {
  try {
    const updateTag = await TagModel.findByIdAndUpdate(
      req.params.id,
      req.validatedData,
      { new: true }
    );
    return res.status(200).json(updateTag);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const tagId = req.params.id;
    await ArticleModel.deleteMany({ tags: tagId });
    await TagModel.findByIdAndDelete(tagId);
    return res.status(204).json({ msg: "Etiqueta eliminada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
