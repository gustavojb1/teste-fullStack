import express from "express";
import { ClientBusiness } from "../business/ClientBusiness";
import { ClientController } from "../controller/ClientController";
import { ClientDatabase } from "../database/ClientDatabase";
import { ClientDTO } from "../dtos/ClientDTO";

const clientController = new ClientController(
    new ClientBusiness(
      new ClientDTO(),
      new ClientDatabase(),
    ),
    new ClientDTO()
  );

  export const clientRouter = express.Router();

  clientRouter.get("/", clientController.getClients);
  clientRouter.post("/", clientController.createClient);

