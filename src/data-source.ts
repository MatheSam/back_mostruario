import "reflect-metadata";
import { DataSource } from "typeorm";
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "src/database.sqlite", 
  synchronize: true, // Mude para false em produção
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
})

