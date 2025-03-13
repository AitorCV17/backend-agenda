// src/app.ts
import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";
import { router } from "./routes";

const PORT = process.env.PORT || 3020;
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
