import { createPool, Pool } from "mysql2/promise";
import env from "./env";

export class Mysql {
  private connection: Pool | null = null;

  private async getConnection(): Promise<Pool> {
    if (!this.connection) await this.init();
    return this.connection as Pool;
  }

  async init() {
    if (!this.connection) {
      try {
        this.connection = createPool({
          host: env.db.host,
          user: env.db.user,
          password: env.db.password,
          database: env.db.database,
          port: env.db.port,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
        console.log("Criado pool de conexões");
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao criar pool de conexões");
      }
    }
  }

  async execute(sql: string, binds?: any[]) {
    try {
      const connection = await this.getConnection();
      const [rows] = await connection.execute(sql, binds);
      return rows;
    } catch (error) {
      console.error("Erro ao executar a operação:", error);
      throw new Error(`Erro ao executar a operação: ${sql}`);
    }
  }
}

export const mysqlConnections = new Mysql();
