import { ClientDatabase } from "../database/ClientDatabase";
import { ClientDTO, CreateClientInputDTO, CreateClientOutputDTO, GetClientInputDTO, GetClientOutputDTO } from "../dtos/ClientDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Client } from "../models/Client";
import { ClientDB } from "../types";

export class ClientBusiness {
    constructor(
        private clientDTO: ClientDTO, 
        private clientDatabase: ClientDatabase,
    ) { }

    public async getClients(input: GetClientInputDTO): Promise<GetClientOutputDTO> {
        if (input.page < 1) {
            input.page = 1;
        }

        const clientsDB: ClientDB[] = await this.clientDatabase.getClients(
            input.page,
            input.pageSize,
            input.nome,
            input.email,
            input.telefone,
            input.columToOrder,
            input.asc
        );
        
        const clients: Client[] = clientsDB.map(clientDB => new Client(
            clientDB.id,
            clientDB.nome,
            clientDB.email,
            clientDB.telefone,
            clientDB.x,
            clientDB.y
        ));
        

        const totalItems = Number(await this.clientDatabase.countClients(
            input.nome,
            input.email,
            input.telefone
        ));

        const totalPages = Math.ceil(totalItems / input.pageSize);

        return this.clientDTO.getClientOutput(clients, input.page, totalPages, totalItems);
    }

    public async createClient(input: CreateClientInputDTO): Promise<CreateClientOutputDTO> {
        const{nome, email, telefone, x, y} = input;

        if (!nome || !email || !telefone || !x || !y) {
            throw new NotFoundError("Preencha todos os campos");
        }

        const userDBName = await this.clientDatabase.findClientByNome(nome);
        if (userDBName) {
          throw new BadRequestError("Já existe um user com esse 'nome'");
        }
    
        const userDBEmail = await this.clientDatabase.findClientByEmail(email);
        if (userDBEmail) {
          throw new BadRequestError("Já existe um user com esse 'email'");
        }

        const newClient = new Client(
            undefined,
            nome,
            email,
            telefone,
            x,
            y
        );

        const newClientDB = newClient.toDBModel();
        await this.clientDatabase.createClient(newClientDB);

        const output: CreateClientOutputDTO = {
            message: "Cliente criado com sucesso"
        }

        return output;
    }
}