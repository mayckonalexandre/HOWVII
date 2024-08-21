import { Mysql, mysqlConnections } from "./config/db";

export type Payments = {
  id_venda: number;
  data_pagamento: Date;
  valor_pagamento: number;
  cod_imovel: number;
  descricao_imovel: string;
  cod_tipo: number;
  tipo_imovel: string;
};

export class Repository {
  constructor(private db: Mysql) {}

  async getAllPayments() {
    const sql = `SELECT * from pagamento p inner join imovel i on p.cod_imovel = i.cod_imovel inner join tipo t on i.cod_tipo = t.cod_tipo`;
    return (await this.db.execute(sql)) as Payments[];
  }
}

export const repository = new Repository(mysqlConnections);
