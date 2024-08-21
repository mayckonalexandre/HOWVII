import { repository, Repository } from "./repository";

type ResponseSumOfPaymentsPerProperty = {
  cod_imovel: number;
  sumPayments: number;
  description: string;
};

export class PaymentService {
  constructor(private readonly repository: Repository) {}

  async getAllPayments() {
    return await this.repository.getAllPayments();
  }

  async sumOfPaymentsPerProperty() {
    const payments = await this.repository.getAllPayments();

    const sum: ResponseSumOfPaymentsPerProperty[] = payments.reduce(
      (acc, current) => {
        const existingProperty = acc.find(
          (value) => value.cod_imovel === current.cod_imovel
        );

        if (existingProperty)
          existingProperty.sumPayments += current.valor_pagamento;
        else
          acc.push({
            cod_imovel: current.cod_imovel,
            description: current.descricao_imovel,
            sumPayments: current.valor_pagamento,
          });

        return acc;
      },
      [] as ResponseSumOfPaymentsPerProperty[]
    );

    return sum;
  }
}

export const paymentService = new PaymentService(repository);
