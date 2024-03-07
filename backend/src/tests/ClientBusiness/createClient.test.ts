import { ClientBusiness } from "../../business/ClientBusiness";
import { ClientDTO, CreateClientInputDTO, CreateClientOutputDTO } from "../../dtos/ClientDTO";

// Mock para ClientDTO
const mockClientDTO: ClientDTO = {
    getClientInput: jest.fn(),
    getClientOutput: jest.fn(),
    createClientInput: jest.fn(),
    createOutput: jest.fn(),
    deleteClientInput: jest.fn(),
    deleteClientOutput: jest.fn(),
    bruteForceOutput: jest.fn(),
    heuristicOutput: jest.fn()
  };
  
  describe("Test createClient function", () => {
    test("Should return the correct output when input is valid", async () => {
      const mockClientDatabase: any = {
        findClientByEmail: jest.fn(async () => null),
        createClient: jest.fn(async () => {})
      };
  
      const clientBusiness = new ClientBusiness(mockClientDTO, mockClientDatabase);
  
      const input: CreateClientInputDTO = {
        nome: "nome",
        email: "email",
        telefone: "telefone",
        x: 1,
        y: 1
      };
  
      const result: CreateClientOutputDTO = await clientBusiness.createClient(input);
  
      expect(result).toEqual({
        message: "Cliente criado com sucesso"
      });
    });
  });