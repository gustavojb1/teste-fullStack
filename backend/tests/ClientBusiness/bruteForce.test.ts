import { ClientBusiness } from "../../src/business/ClientBusiness";
import { BruteForceOutputDTO, ClientDTO } from "../../src/dtos/ClientDTO";
import { Client } from "../../src/models/Client";

// Mock para ClientDTO
const mockClientDTO: ClientDTO = {
    getClientInput: jest.fn(),
    getClientOutput: jest.fn(),
    createClientInput: jest.fn(),
    createOutput: jest.fn(),
    deleteClientInput: jest.fn(),
    deleteClientOutput: jest.fn(),
    bruteForceOutput: jest.fn((rota) => ({
      rota: rota.map(client => client.toDBModel())
    })),
    heuristicOutput: jest.fn()
  };
  
  describe("Test bruteForce function", () => {
    test("Should return the correct output when input is valid", async () => {
      const mockClientDatabase: any = {
        getClients: jest.fn(async () => [
          new Client(1, "nome", "email", "telefone", 1, 1),
          new Client(2, "nome2", "email2", "telefone2", 2, 2)
        ])
      };
  
      const clientBusiness = new ClientBusiness(mockClientDTO, mockClientDatabase);
  
      const result: BruteForceOutputDTO = await clientBusiness.bruteForce();
  
      expect(result).toEqual({
        rota: [
          new Client(1, "nome", "email", "telefone", 1, 1).toDBModel(),
          new Client(2, "nome2", "email2", "telefone2", 2, 2).toDBModel()
        ]
      });
    });

    test("Should throw an error when there are less than 2 clients", async () => {
        const mockClientDatabase: any = {
          getClients: jest.fn(async () => [
            new Client(1, "nome", "email", "telefone", 1, 1) // Apenas 1 cliente
          ])
        };
    
        const clientBusiness = new ClientBusiness(mockClientDTO, mockClientDatabase);
    
        await expect(clientBusiness.bruteForce()).rejects.toThrow("Impossível fazer o cálculo com menos de 2 clientes cadastrados");
      });
  });