-- Active: 1709671560955@@127.0.0.1@5432@teste_fullstack@clients
CREATE DATABASE teste_fullStack;


\c teste_fullStack;

CREATE SCHEMA IF NOT EXISTS clients
    AUTHORIZATION postgres;

CREATE TABLE clients.clients (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(15),
    x NUMERIC,
    y NUMERIC
);

INSERT INTO clients.clients (nome, email, telefone, x, y)
VALUES ('Usuario 1', 'usuario1@email.com', '1234567890', 10, 20),
       ('Usuario 2', 'usuario2@email.com', '0987654321', 30, 40);
