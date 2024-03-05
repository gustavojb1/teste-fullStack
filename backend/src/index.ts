import cors from "cors";
import express from "express";
import dotenv from "dotenv";

// dotenv
dotenv.config();


// express
const app = express();
app.use(cors());
app.use(express.json());




//TESTE
const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

// Rota para buscar clientes
app.get('/clientes/search', async (req, res) => {
    try {
        const clientes = await db.any('SELECT * FROM clientes.clientes');
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});




// Configuração da Porta
app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
  })