import { ClientDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

// export class ClientDatabase extends BaseDatabase {
//   private static TABLE_CLIENT = "Client";

//   public async findClients(){
//     const result: ClientDB[] = await BaseDatabase
//     .connection(ClientDatabase.TABLE_CLIENT);
//     return result;
//   }
// }

export class ClientDatabase extends BaseDatabase {
  private static TABLE_CLIENT = "clients.clients";

  // public async getClients(
  //   page: number,
  //   pageSize: number,
  //   nome?: string,
  //   email?: string,
  //   telefone?: string,
  //   columToOrder?: string,
  //   asc?: boolean
  // ) {
  //   const conditions = {} as any;
  //   if (nome !== undefined) conditions.nome = nome;
  //   if (email !== undefined) conditions.email = email;
  //   if (telefone !== undefined) conditions.telefone = telefone;

  //   const result: ClientDB[] = await BaseDatabase.connection(ClientDatabase.TABLE_CLIENT)
  //     .where(conditions)
  //     .orderBy(columToOrder ? columToOrder : "nome", asc ? "asc" : "desc")
  //     .limit(pageSize)
  //     .offset((page - 1) * pageSize);
  
  //   return result;
  // }

  
  public async getClients(
    page: number,
    pageSize: number,
    nome?: string,
    email?: string,
    telefone?: string,
    columToOrder?: string,
    asc?: boolean
  ) {
    const query = BaseDatabase.connection(ClientDatabase.TABLE_CLIENT)
      .orderBy(columToOrder ? columToOrder : "nome", asc ? "asc" : "desc")
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    if (nome !== undefined) query.andWhere(BaseDatabase.connection.raw('LOWER(nome)'), 'like', `%${nome.toLowerCase()}%`);
    if (email !== undefined) query.andWhere(BaseDatabase.connection.raw('LOWER(email)'), 'like', `%${email.toLowerCase()}%`);
    if (telefone !== undefined) query.andWhere('telefone', 'like', `%${telefone}%`);

    const result: ClientDB[] = await query;
  
    return result;
  }

  public async countClients(nome?: string, email?: string, telefone?: string) {
    const conditions = {} as any;
    if (nome !== undefined && nome) conditions.nome = nome;
    if (email !== undefined && email) conditions.email = email;
    if (telefone !== undefined && telefone ) conditions.telefone = telefone;

    const totalItems: any[] = await BaseDatabase.connection(ClientDatabase.TABLE_CLIENT)
      .where(conditions)
      .count('* as count');
  
    return totalItems[0].count;
  }

  
  public async findClientByNome(nome: string) {
    const [result]: ClientDB[] | undefined[] = await BaseDatabase
      .connection(ClientDatabase.TABLE_CLIENT)
      .where({ nome });
    return result;
  }

  public async findClientByEmail(email: string) {
    const [result]: ClientDB[] | undefined[] = await BaseDatabase
      .connection(ClientDatabase.TABLE_CLIENT)
      .where({ email });
    return result;
  }

  public async findClientById(id: number) {
    const [result]: ClientDB[] | undefined[] = await BaseDatabase
      .connection(ClientDatabase.TABLE_CLIENT)
      .where({ id });
    return result;
  }

  public async createClient(client: ClientDB) {
    await BaseDatabase.connection(ClientDatabase.TABLE_CLIENT)
      .insert(client);
  }

  public async deleteClient(id: number) {
    await BaseDatabase.connection(ClientDatabase.TABLE_CLIENT)
      .where({ id })
      .del();
  }
}
