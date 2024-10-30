import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "src/database.sqlite", 
  synchronize: true, // Mude para false em produção
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
})
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
