import mongoose from "mongoose";

export const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // para borrar toda la base de datos
    // await mongoose.connection.dropDatabase();
    console.log("Conectado a la base de datos👍");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
    throw error;
  }
};
