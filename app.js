import express from "express";
import { initDB } from "./src/config/db.js";
import "dotenv/config";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}😳`);
    });
  })
  .catch((error) => {
    console.error("Error al iniciar la base de datos:", error);
    process.exit(1);
  });
