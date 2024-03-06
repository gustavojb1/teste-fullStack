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



// Rota de teste BASEDATABASE
// app.get("/test", async (req, res) => {
//     try {
//         const result = await BaseDatabase.connection.raw("SELECT * FROM clientes.clientes");
//         res.send(result.rows);
//     } catch (error) {
//         console.error("Erro ao testar a conexão com o banco de dados:", error);
//         res.status(500).json({ error: "Erro ao testar a conexão com o banco de dados" });
//     }
// });




// Configuração da Porta
app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
  })