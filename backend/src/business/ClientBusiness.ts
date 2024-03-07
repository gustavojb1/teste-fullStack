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
        ); // Buscar todos os clientes cadastrados no banco de dados
    
        if (clientsDB.length < 2) { // Verificar se há pelo menos 2 clientes cadastrados
            throw new NotFoundError("Impossível fazer o cálculo com menos de 2 clientes cadastrados");
        }
    
        const clientsToCalculate: ClientToCalculate[] = clientsDB.map(clientDB => {
            return {
                id: clientDB.id,
                nome: clientDB.nome,
                x: clientDB.x,
                y: clientDB.y
            }
        }); // Mapear os dados dos clientes para um formato mais simples com apenas id, nome, x e y
    
        let shortestDistance = Infinity; // Inicializar a menor distância com infinito, pois qualquer distância será menor que infinito
        let shortestRoute: ClientToCalculate[] = []; // Inicializar a menor rota como um array vazio
    
        // Criar um objeto para representar a empresa
        let empresa: ClientToCalculate = {
            id: -1,
            nome: "Empresa",
            x: 0,
            y: 0
        }; // Inicializa a empresa com id -1, nome "Empresa", x 0 e y 0 (no ponto 0)
    
        // Calcular todas as permutações possíveis
        const routes = this.permute(clientsToCalculate); // Calcular todas as permutações(rotas) possíveis

        for (const route of routes) { // Loop para percorrer todas as rotas possíveis
            let distance = 0; // Inicializa a distância com 0
            let lastPoint = empresa;  // Inicializa o último ponto com a empresa pois o teste pede que a rota comece e termine na empresa
        
            for (const point of route) { // Loop para percorrer todos os pontos da rota
                distance += this.calculateDistance(lastPoint, point); // Calcular a distância entre o último ponto e o ponto atual
                lastPoint = point; // Atualizar o último ponto com o ponto atual
            } // Esse loop calculará a distância total da rota (soma das distâncias entre cada ponto da rota) e atualizará o último ponto com o ponto atual
        
            distance += this.calculateDistance(lastPoint, empresa);  // aqui calcula a distância entre o último ponto(soma total da distancia entre todos os pontos da rota) e a empresa
            
        
            if (distance < shortestDistance) { // Verificar se a distância da rota atual é menor que a menor distância encontrada até agora
                shortestDistance = distance; // Atualizar a menor distância com a distância da rota atual
                shortestRoute = route; // Atualizar a menor rota com a rota atual
            }
        }
    
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

    private permute(array: ClientToCalculate[]): ClientToCalculate[][] { // Função para calcular todas as permutações(rotas) possíveis
        if (array.length <= 1) return [array];// Se o array tiver apenas um elemento, retorna ele mesmo
        let result = []; // Inicializa um array para armazenar as permutações(possíveis rotas)
        const used = new Set(); // Conjunto para rastrear elementos já usados
        for (let i = 0; i < array.length; i++) { // Loop para percorrer o array
            if (!used.has(array[i])) { // Verifica se o elemento ainda não foi usado
                used.add(array[i]); // Adiciona o elemento ao conjunto de elementos usados
                const rest = array.slice(0, i).concat(array.slice(i + 1)); // Cria um novo array sem o elemento atual
                for (let permutation of this.permute(rest)) { // Chama a função recursivamente para calcular as permutações(rotas) do novo array reduzido
                    result.push([array[i]].concat(permutation)); // Adiciona o elemento atual no início de cada permutação(rotas) do novo array de resultado
                }
            }
        }
        return result; // Retorna todas as permutações(rotas) possíveis
        //Esse Passo gerará uma complexidade de fatorial para o cálculo de todas as permutações possíveis, no caso de 4 clientes, serão 24 rotas possíveis, no caso de 5 clientes, serão 120 rotas possíveis, e assim por diante.
    }


    private calculateDistance(point1: ClientToCalculate, point2: ClientToCalculate): number { // Função para calcular a distância entre dois pontos - Pitágoras
        //pitagoras é a raiz quadrada da soma dos quadrados dos catetos(cateto é a diferença entre as coordenadas x e y dos dois pontos)
        const dx = point2.x - point1.x; // Calcular a diferença entre as coordenadas x dos dois pontos
        const dy = point2.y - point1.y; // Calcular a diferença entre as coordenadas y dos dois pontos
        return Math.sqrt(dx * dx + dy * dy); // Calcular a distância entre os dois pontos usando o teorema de Pitágoras
        //pitagoras é a raiz quadrada da soma dos quadrados dos catetos(cateto é a diferença entre as coordenadas x e y dos dois pontos)
    }



    
    public async heuristic(): Promise<BruteForceOutputDTO> {
        const clientsDB: ClientDB[] = await this.clientDatabase.getClients( // Buscar todos os clientes cadastrados no banco de dados
            1,
            100,
            undefined,
            undefined,
            undefined,
            undefined,
            true
        );
    
        if (clientsDB.length < 2) { // Verificar se há pelo menos 2 clientes cadastrados
            throw new NotFoundError("Impossível fazer o cálculo com menos de 2 clientes cadastrados");
        }
    
        let clientsToCalculate: ClientToCalculate[] = clientsDB.map(clientDB => { // Mapear os dados dos clientes para um formato mais simples com apenas id, nome, x e y
            return {
                id: clientDB.id,
                nome: clientDB.nome,
                x: clientDB.x,
                y: clientDB.y
            }
        });
    
        let empresa: ClientToCalculate = { // Criar um objeto para representar a empresa com id -1, nome "Empresa", x 0 e y 0
            id: -1,
            nome: "Empresa",
            x: 0,
            y: 0
        };
    
        let route: ClientToCalculate[] = [empresa]; // Inicializar a rota com a empresa
        let currentPoint = empresa; // Inicializar o ponto atual com a empresa para começar o cálculo
    
        while (clientsToCalculate.length > 0) { // Loop para percorrer todos os clientes
            let nearestPoint = clientsToCalculate[0]; // Inicializar o ponto mais próximo com o primeiro cliente
            let shortestDistance = this.calculateDistance(currentPoint, nearestPoint); // Inicializar a menor distância com a distância entre o ponto atual e o primeiro cliente
    
            for (const point of clientsToCalculate) { // Loop para percorrer todos os clientes
                const distance = this.calculateDistance(currentPoint, point); // Calcular a distância entre o ponto atual e o cliente atual
                if (distance < shortestDistance) { // Verificar se a distância é menor que a menor distância encontrada até agora
                    nearestPoint = point; // Atualizar o ponto mais próximo com o cliente atual
                    shortestDistance = distance; // Atualizar a menor distância com a distância atual
                }
            }
    
            route.push(nearestPoint); // Adicionar o ponto mais próximo à rota
            clientsToCalculate = clientsToCalculate.filter(client => client.id !== nearestPoint.id); // Remover o ponto mais próximo da lista de clientes para calcular
            currentPoint = nearestPoint; // Atualizar o ponto atual com o ponto mais próximo
        }
        console.log(route);
    
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