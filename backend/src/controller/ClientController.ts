import { Request, Response } from "express";
import { ClientBusiness } from "../business/ClientBusiness";
import { ClientDTO } from "../dtos/ClientDTO";
import { BaseError } from "../errors/BaseError";

export class ClientController {
  constructor(
    private clientBusiness: ClientBusiness,
    private clientDTO: ClientDTO
  ) {}

  public getClients = async (req: Request, res: Response) => {
    try {

      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;
      const nome = req.query.nome as string;
      const email = req.query.email as string;
      const telefone = req.query.telefone as string;
      const columToOrder = req.query.columToOrder as string;
      const asc = req.query.asc === undefined ? true : req.query.asc === 'true';


      const input = this.clientDTO.getClientInput(
        page,
        pageSize,
        nome,
        email,
        telefone,
        columToOrder,
        asc
      );

      const output = await this.clientBusiness.getClients(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createClient = async (req: Request, res: Response) => {
    try {
      const{nome, email, telefone, x, y} = req.body;

      const input = this.clientDTO.createClientInput(nome, email, telefone, x, y);
      await this.clientBusiness.createClient(input);

      res.status(200).send("Cliente criado com sucesso");
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deleteClient = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const input = this.clientDTO.deleteClientInput(id);
      const output = await this.clientBusiness.deleteClient(id);

      res.status(200).send("Cliente deletado com sucesso");
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public bruteForce = async (req: Request, res: Response) => {
    try {

      const output = await this.clientBusiness.bruteForce();

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  }

  public heuristic = async (req: Request, res: Response) => {
    try {

      const output = await this.clientBusiness.heuristic();

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  }
}
