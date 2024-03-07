import { ClientBusiness } from "../../src/business/ClientBusiness";
import {
  ClientDTO,
  CreateClientInputDTO,
  GetClientInputDTO,
  GetClientOutputDTO,
} from "../../src/dtos/ClientDTO";
import { Client } from "../../src/models/Client";

// Mock para ClientDTO
const mockClientDTO: ClientDTO = {
  getClientInput: jest.fn(),
  getClientOutput: jest.fn((clients, page, totalPages, totalItems) => ({
    data: clients.map((client) => client.toDBModel()),
    page,
    totalPages,
    totalItems,
  })),
  createClientInput: jest.fn(),
  createOutput: jest.fn(),
  deleteClientInput: jest.fn(),
  deleteClientOutput: jest.fn(),
  bruteForceOutput: jest.fn(),
  heuristicOutput: jest.fn(),
};

describe("Test getClient function", () => {
  test("Should return the correct output when input is valid", async () => {
    const mockClientDatabase: any = {
      getClients: jest.fn(async () => [
        new Client(1, "nome", "email", "telefone", 1, 1),
      ]),
      countClients: jest.fn(async () => 1),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const input: GetClientInputDTO = {
      page: 1,
      pageSize: 1,
    };

    const result: GetClientOutputDTO = await clientBusiness.getClients(input);

    expect(result).toEqual({
      data: [new Client(1, "nome", "email", "telefone", 1, 1).toDBModel()],
      page: 1,
      totalPages: 1,
      totalItems: 1,
    });
  });

  test("Should throw an error when getClients fails", async () => {
    const mockClientDatabase: any = {
      getClients: jest.fn(() => {
        throw new Error("Erro ao buscar clientes");
      }),
      countClients: jest.fn(async () => 1),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const input: GetClientInputDTO = {
      page: 1,
      pageSize: 1,
    };

    await expect(clientBusiness.getClients(input)).rejects.toThrow(
      "Erro ao buscar clientes"
    );
  });

  test("Should throw an error when countClients fails", async () => {
    const mockClientDatabase: any = {
      getClients: jest.fn(async () => [
        new Client(1, "nome", "email", "telefone", 1, 1),
      ]),
      countClients: jest.fn(() => {
        throw new Error("Erro ao contar clientes");
      }),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const input: GetClientInputDTO = {
      page: 1,
      pageSize: 1,
    };

    await expect(clientBusiness.getClients(input)).rejects.toThrow(
      "Erro ao contar clientes"
    );
  });

  test("Should throw an error when 'nome' is empty", async () => {
    const mockClientDatabase: any = {
      findClientByEmail: jest.fn(async () => null),
      createClient: jest.fn(async () => {}),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const input: CreateClientInputDTO = {
      nome: "",
      email: "email",
      telefone: "telefone",
      x: 1,
      y: 1,
    };

    await expect(clientBusiness.createClient(input)).rejects.toThrow(
      "Preencha todos os campos"
    );
  });

  test("Should throw an error when 'email' is empty", async () => {
    const mockClientDatabase: any = {
      findClientByEmail: jest.fn(async () => null),
      createClient: jest.fn(async () => {}),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const input: CreateClientInputDTO = {
      nome: "nome",
      email: "",
      telefone: "telefone",
      x: 1,
      y: 1,
    };

    await expect(clientBusiness.createClient(input)).rejects.toThrow(
      "Preencha todos os campos"
    );
  });

  test("Should throw an error when 'nome' is too long", async () => {
    const mockClientDatabase: any = {
      findClientByEmail: jest.fn(async () => null),
      createClient: jest.fn(async () => {}),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const input: CreateClientInputDTO = {
      nome: "a".repeat(101), // 'nome' com mais de 100 caracteres
      email: "email",
      telefone: "telefone",
      x: 1,
      y: 1,
    };

    await expect(clientBusiness.createClient(input)).rejects.toThrow(
      "'nome' não deve ter mais de 100 caracteres"
    );
  });

  test("Should throw an error when 'email' is too long", async () => {
    const mockClientDatabase: any = {
      findClientByEmail: jest.fn(async () => null),
      createClient: jest.fn(async () => {}),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const input: CreateClientInputDTO = {
      nome: "nome",
      email: "a".repeat(101), // 'email' com mais de 100 caracteres
      telefone: "telefone",
      x: 1,
      y: 1,
    };

    await expect(clientBusiness.createClient(input)).rejects.toThrow(
      "'email' não deve ter mais de 100 caracteres"
    );
  });

  test("Should throw an error when 'telefone' is too long", async () => {
    const mockClientDatabase: any = {
      findClientByEmail: jest.fn(async () => null),
      createClient: jest.fn(async () => {}),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const input: CreateClientInputDTO = {
      nome: "nome",
      email: "email",
      telefone: "a".repeat(16), // 'telefone' com mais de 15 caracteres
      x: 1,
      y: 1,
    };

    await expect(clientBusiness.createClient(input)).rejects.toThrow(
      "'telefone' não deve ter mais de 15 caracteres"
    );
  });

  test("Should throw an error when 'email' already exists", async () => {
    const mockClientDatabase: any = {
      findClientByEmail: jest.fn(
        async () => new Client(1, "nome", "email", "telefone", 1, 1)
      ), // 'email' já existe
      createClient: jest.fn(async () => {}),
    };

    const clientBusiness = new ClientBusiness(
      mockClientDTO,
      mockClientDatabase
    );

    const input: CreateClientInputDTO = {
      nome: "nome",
      email: "email",
      telefone: "telefone",
      x: 1,
      y: 1,
    };

    await expect(clientBusiness.createClient(input)).rejects.toThrow(
      "Já existe um user com esse 'email'"
    );
  });
});
