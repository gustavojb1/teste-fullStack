// CREATE TABLE clientes.clientes (
//     id SERIAL PRIMARY KEY,
//     nome VARCHAR(100),
//     email VARCHAR(100),
//     telefone VARCHAR(15),
//     x NUMERIC,
//     y NUMERIC
// );

import { BadRequestError } from "../errors/BadRequestError";
import { Client } from "../models/Client";

export interface GetClientInputDTO {
    page: number;
    pageSize: number;
    nome?: string;
    email?: string;
    telefone?: string;
    columToOrder?: string;
    asc?: boolean;
}


export interface ClientDB {
    id: number | undefined;
    nome: string;
    email: string;
    telefone: string;
    x: number;
    y: number;
}

export interface GetClientOutputDTO {
    data: ClientDB[];
    page: number;
    totalPages: number;
    totalItems: number;
}

export interface CreateClientInputDTO {
    nome: string;
    email: string;
    telefone: string;
    x: number;
    y: number;
}

export interface CreateClientOutputDTO {
    message: string;
}

export class ClientDTO {

    getClientInput = ( page: number, pageSize: number, nome?: string, email?: string, telefone?: string, columToOrder?: string, asc?: boolean): GetClientInputDTO => {
        return {
            page: page,
            pageSize: pageSize,
            nome: nome,
            email: email,
            telefone: telefone,
            columToOrder: columToOrder,
            asc: asc
        }
    }

    
    
    getClientOutput = (clients: Client[], page: number, totalPages: number, totalItems: number): GetClientOutputDTO => {
        return {
            data: clients.map(client => ({
                id: client.getId(),
                nome: client.getNome(),
                email: client.getEmail(),
                telefone: client.getTelefone(),
                x: client.getX(),
                y: client.getY()
            })),
            page,
            totalPages,
            totalItems
        }
    }

    createClientInput = (nome: string, email: string, telefone: string, x: number, y: number): CreateClientInputDTO  => {
        if(typeof nome !== "string"){
            throw new BadRequestError("Nome inválido")
        }
        if(typeof email !== "string"){
            throw new BadRequestError("Email inválido")
        }
        if(typeof telefone !== "string"){
            throw new BadRequestError("Telefone inválido")
        }
        if(typeof x !== "number"){
            throw new BadRequestError("valor de X inválido")
        }
        if(typeof y !== "number"){
            throw new BadRequestError("valor de Y inválido")
        }
        return {
            nome,
            email,
            telefone,
            x,
            y
        }
    }

    createOutput(message:string): CreateClientOutputDTO {
        return {
            message
        }
    }



    
}
