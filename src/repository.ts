import { Mysql } from "./db";

export class Repository {
  constructor(private db: Mysql) {}

  async getAllPayments() {
    const sql = `SELECT * from pagamento p inner join imovel i on p.cod_imovel = i.cod_imovel inner join tipo t on i.cod_tipo = t.cod_tipo`;
    return await this.db.execute(sql);
  }
}
