import { repository, Repository } from "./repository";

type ResponseSumOfPaymentsPerProperty = {
  sumPayments: number;
  description: string;
};

export class PaymentService {
  constructor(private readonly repository: Repository) {}

  async getAllPayments() {
    return await this.repository.getAllPayments();
  }

  async getSalesByDate() {
    const orders = await this.getAllPayments();

    //SELECT DATE_FORMAT(data_pagamento, '%m/%Y') AS period,SUM(valor_pagamento) AS total_sales,COUNT(id_venda) AS sales_quantity
    //FROM pagamento GROUP BY period ORDER BY period DESC;

    const salesByPeriod = orders.reduce(
      (acc, { data_pagamento, valor_pagamento }) => {
        const date = `${data_pagamento.getFullYear()}${String(
          data_pagamento.getMonth() + 1
        ).padStart(2, "0")}`;

        acc[date]
          ? (acc[date].totalSales += valor_pagamento)
          : (acc[date] = { totalSales: valor_pagamento, salesQuantity: 0 });

        acc[date].salesQuantity++;

        return acc;
      },
      {} as { [key: string]: { salesQuantity: number; totalSales: number } }
    );

    const formatted = Object.keys(salesByPeriod).map((date) => {
      const { totalSales, salesQuantity } = salesByPeriod[date];
      return {
        date,
        totalSales,
        salesQuantity,
      };
    });

    return formatted;
  }

  async sumOfPaymentsPerProperty() {
    const payments = await this.repository.getAllPayments();

    //SELECT i.cod_imovel,i.descricao_imovel,SUM(p.valor_pagamento) AS total_pagamentos FROM pagamento p
    //INNER JOIN imovel i ON p.cod_imovel = i.cod_imovel INNER JOIN tipo t ON i.cod_tipo = t.cod_tipo GROUP BY i.cod_imovel, i.descricao_imovel
    //ORDER BY cod_imovel DESC;

    const sum: { [keys: number]: ResponseSumOfPaymentsPerProperty } =
      payments.reduce(
        (acc, { cod_imovel, descricao_imovel, valor_pagamento }) => {
          acc[cod_imovel]
            ? (acc[cod_imovel].sumPayments += valor_pagamento)
            : (acc[cod_imovel] = {
                description: descricao_imovel,
                sumPayments: valor_pagamento,
              });

          return acc;
        },
        {} as { [keys: number]: ResponseSumOfPaymentsPerProperty }
      );

    const formattedPayments = Object.keys(sum).map((value) => {
      const cod = Number(value);
      const obj = sum[cod];
      return {
        cod_imovel: cod,
        description: obj.description,
        sumPayments: obj.sumPayments,
      };
    });

    return formattedPayments;
  }

  async percentageByTypeOfProperty() {
    const data = await this.getAllPayments();

    if (!data) return null;

    const calculatePercentage = (value: number) => (value * 100) / data.length;

    const metrics = data.reduce((acc, { tipo_imovel }) => {
      acc[tipo_imovel] = (acc[tipo_imovel] || 0) + 1;

      return acc;
    }, {} as { [key: string]: number });

    const percentage = Object.keys(metrics).map((key) => ({
      [key]: `${calculatePercentage(metrics[key])}%`,
    }));

    console.log(percentage);

    return percentage;
  }
}

export const paymentService = new PaymentService(repository);
