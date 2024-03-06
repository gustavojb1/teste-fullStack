export interface ClientDB {
    id: number | undefined;
    nome: string;
    email: string;
    telefone: string;
    x: number;
    y: number;
}

export interface ClientToCalculate {
    id: number | undefined;
    nome: string;
    x: number;
    y: number;
}