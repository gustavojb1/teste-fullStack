import { ClientBusiness } from "../../src/business/ClientBusiness";
import { ClientDTO } from "../../src/dtos/ClientDTO";
import { Client } from "../../src/models/Client";

// Mock para ClientDTO
const mockClientDTO: ClientDTO = {
  getClientInput: jest.fn(),
  getClientOutput: jest.fn(),
  createClientInput: jest.fn(),
  createOutput: jest.fn(),
  deleteClientInput: jest.fn(),
  deleteClientOutput: jest.fn(),
  bruteForceOutput: jest.fn(),
  heuristicOutput: jest.fn(),
};

describe("Test deleteClient function", () => {
  test("Should not throw any error when input is valid", async () => {
    const mockClientDatabase: any = {
      findClientById: jest.fn(
        async () => new Client(1, "nome", "email", "telefone", 1, 1)
      ),
      deleteClient: jest.fn(async () => {}),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const id = "1";

    await expect(clientBusiness.deleteClient(id)).resolves.not.toThrow();
  });

  test("Should throw an error when 'id' is empty", async () => {
    const mockClientDatabase: any = {
      findClientById: jest.fn(
        async () => new Client(1, "nome", "email", "telefone", 1, 1)
      ),
      deleteClient: jest.fn(async () => {}),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const id = ""; // 'id' vazio

    await expect(clientBusiness.deleteClient(id)).rejects.toThrow(
      "Preencha o campo 'id'"
    );
  });

  test("Should throw an error when client with 'id' does not exist", async () => {
    const mockClientDatabase: any = {
      findClientById: jest.fn(async () => null), // Cliente com 'id' não existe
      deleteClient: jest.fn(async () => {}),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const id = "1";

    await expect(clientBusiness.deleteClient(id)).rejects.toThrow(
      "Não existe um user com esse 'id'"
    );
  });
});
