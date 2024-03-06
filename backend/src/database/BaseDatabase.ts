import { knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export abstract class BaseDatabase {
    protected static connection = knex({
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        },
        pool: { 
            min: 0,
            max: 5,
        }
    });
}