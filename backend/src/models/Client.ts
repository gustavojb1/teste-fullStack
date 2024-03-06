import { ClientDB } from "../types";


export class Client {
    constructor(
        private id: number | undefined ,
        private nome: string,
        private email: string,
        private telefone: string,
        private x: number,
        private y: number
    ) { }

    public toDBModel(): ClientDB {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            telefone: this.telefone,
            x: this.x,
            y: this.y
        }
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }

    public getEmail(): string {
        return this.email;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

}