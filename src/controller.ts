import { Request, Response } from "express";
import { paymentService } from "./payment.service";

export async function getPaymentController(req: Request, res: Response) {
  const payments = await paymentService.getAllPayments();
  return res.status(200).json(payments);
}

export async function getSalesByDate(req: Request, res: Response) {
  const orders = await paymentService.getSalesByDate()
  return res.status(200).json(orders)
}

export async function sumOfPaymentsPerPropertyController(req: Request, res: Response) {
  const sum = await paymentService.sumOfPaymentsPerProperty();
  return res.status(200).json(sum);
}
