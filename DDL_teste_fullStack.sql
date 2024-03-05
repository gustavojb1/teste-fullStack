-- Active: 1709665227765@@127.0.0.1@5432@teste_fullstack
CREATE DATABASE teste_fullStack;


\c teste_fullStack;

CREATE SCHEMA IF NOT EXISTS clientes
    AUTHORIZATION postgres;

CREATE TABLE clientes.clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(15),
    x NUMERIC,
    y NUMERIC
);

-- INSERT INTO clientes.clientes (nome, email, telefone, x, y)
-- VALUES ('Usuario 1', 'usuario1@email.com', '1234567890', 10, 20),
--        ('Usuario 2', 'usuario2@email.com', '0987654321', 30, 40);