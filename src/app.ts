import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "./routes";
import "reflect-metadata";

const PORT = process.env.PORT || 3020;
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
