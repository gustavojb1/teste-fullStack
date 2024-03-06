import { ClientDatabase } from "../database/ClientDatabase";
import { BruteForceOutputDTO, ClientDTO, CreateClientInputDTO, CreateClientOutputDTO, GetClientInputDTO, GetClientOutputDTO } from "../dtos/ClientDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Client } from "../models/Client";
import { ClientDB, ClientToCalculate } from "../types";

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
            throw new BadRequestError("Preencha todos os campos");
        }

        if (nome.length > 100) {
            throw new BadRequestError("'nome' não deve ter mais de 100 caracteres");
        }
    
        if (email.length > 100) {
            throw new BadRequestError("'email' não deve ter mais de 100 caracteres");
        }
    
        if (telefone.length > 15) {
            throw new BadRequestError("'telefone' não deve ter mais de 15 caracteres");
        }

        // const userDBName = await this.clientDatabase.findClientByNome(nome);
        // if (userDBName) {
        //   throw new BadRequestError("Já existe um user com esse 'nome'");
        // }
    
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
    
    public async deleteClient(id: string): Promise<void> {
        if (!id) {
            throw new NotFoundError("Preencha o campo 'id'");
        }

        const userDB = await this.clientDatabase.findClientById(Number(id));
        if (!userDB) {
            throw new NotFoundError("Não existe um user com esse 'id'");
        }

        await this.clientDatabase.deleteClient(Number(id))
    }

    public async bruteForce(): Promise<BruteForceOutputDTO> {

        const clientsDB: ClientDB[] = await this.clientDatabase.getClients(
            1,
            100,
            undefined,
            undefined,
            undefined,
            undefined,
            true
        );
    
        if (clientsDB.length < 2) {
            throw new NotFoundError("Impossível fazer o cálculo com menos de 2 clientes cadastrados");
        }
    
        const clientsToCalculate: ClientToCalculate[] = clientsDB.map(clientDB => {
            return {
                id: clientDB.id,
                nome: clientDB.nome,
                x: clientDB.x,
                y: clientDB.y
            }
        });
    
        let shortestDistance = Infinity;
        let shortestRoute: ClientToCalculate[] = [];
    
        // Criar um objeto para representar a empresa
        let empresa: ClientToCalculate = {
            id: 0,
            nome: "Empresa",
            x: 0,
            y: 0
        };
    
        // Calcular todas as permutações possíveis
        for (let i = 0; i < clientsToCalculate.length; i++) {
            const remaining = clientsToCalculate.slice(0, i).concat(clientsToCalculate.slice(i + 1));
            const routes = this.permute(remaining);
    
            for (const route of routes) {
                let distance = 0;
                let lastPoint = empresa;  // A empresa
    
                for (const point of route) {
                    distance += this.calculateDistance(lastPoint, point);
                    lastPoint = point;
                }
    
                distance += this.calculateDistance(lastPoint, empresa);  // Retornar à empresa
    
                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    shortestRoute = [clientsToCalculate[i]].concat(route);
                }
            }
        }

        console.log(shortestRoute);
    
        // Buscar novamente os dados completos dos clientes
        const shortestRouteClients: Client[] = [];
        for (const client of shortestRoute) {
            const clientDB = clientsDB.find(c => c.id === client.id);
            if (clientDB) {
                shortestRouteClients.push(new Client(
                    clientDB.id,
                    clientDB.nome,
                    clientDB.email,
                    clientDB.telefone,
                    clientDB.x,
                    clientDB.y
                ));
            } else {
                throw new NotFoundError(`Cliente com ID ${client.id} não encontrado`);
            }
        }

    
        return this.clientDTO.bruteForceOutput(shortestRouteClients);
    
    }


    private calculateDistance(point1: ClientToCalculate, point2: ClientToCalculate): number {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    private permute(array: ClientToCalculate[]): ClientToCalculate[][] {
        if (array.length <= 1) return [array];
        let result = [];
        for (let i = 0; i < array.length; i++) {
            const rest = array.slice(0, i).concat(array.slice(i + 1));
            for (let permutation of this.permute(rest)) {
                result.push([array[i]].concat(permutation));
            }
        }
        return result;
    }














    public async heuristic(): Promise<BruteForceOutputDTO> {
        const clientsDB: ClientDB[] = await this.clientDatabase.getClients(
            1,
            100,
            undefined,
            undefined,
            undefined,
            undefined,
            true
        );
    
        if (clientsDB.length < 2) {
            throw new NotFoundError("Impossível fazer o cálculo com menos de 2 clientes cadastrados");
        }
    
        let clientsToCalculate: ClientToCalculate[] = clientsDB.map(clientDB => {
            return {
                id: clientDB.id,
                nome: clientDB.nome,
                x: clientDB.x,
                y: clientDB.y
            }
        });
    
        // Criar um objeto para representar a empresa
        let empresa: ClientToCalculate = {
            id: 0,
            nome: "Empresa",
            x: 0,
            y: 0
        };
    
        let route: ClientToCalculate[] = [empresa];
        let currentPoint = empresa;
    
        while (clientsToCalculate.length > 0) {
            let nearestPoint = clientsToCalculate[0];
            let shortestDistance = this.calculateDistance(currentPoint, nearestPoint);
    
            for (const point of clientsToCalculate) {
                const distance = this.calculateDistance(currentPoint, point);
                if (distance < shortestDistance) {
                    nearestPoint = point;
                    shortestDistance = distance;
                }
            }
    
            route.push(nearestPoint);
            clientsToCalculate = clientsToCalculate.filter(client => client.id !== nearestPoint.id);
            currentPoint = nearestPoint;
        }
    
        route.push(empresa);  // Retornar à empresa
    
        // Buscar novamente os dados completos dos clientes
        const routeClients: Client[] = [];
        for (const client of route) {
            const clientDB = clientsDB.find(c => c.id === client.id);
            if (clientDB) {
                routeClients.push(new Client(
                    clientDB.id,
                    clientDB.nome,
                    clientDB.email,
                    clientDB.telefone,
                    clientDB.x,
                    clientDB.y
                ));
            } else if (client.id !== empresa.id) {
                throw new NotFoundError(`Cliente com ID ${client.id} não encontrado`);
            }
        }
    
        return this.clientDTO.heuristicOutput(routeClients);
    }
}