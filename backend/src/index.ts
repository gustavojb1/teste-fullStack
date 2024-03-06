import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { BaseDatabase } from "./database/BaseDatabase";
import { clientRouter } from "./router/clientRouter";

// dotenv
dotenv.config();

// express
const app = express();
app.use(cors());
app.use(express.json());

app.use("/clients", clientRouter);

// Configuração da Porta
app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
  })