import { DataSource } from "typeorm";
import "reflect-metadata";


 const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "node_ts",
  synchronize: true,
  logging: true,
  entities: [
    __dirname+'/**/*.entity.ts'
  ],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
              .then(()=> console.log('Conectado'))
              .catch((error)=>console.log(error))


export default {AppDataSource};
