import { Request, Response } from "express";
import { mysqlConnections } from "./db";
import { Repository } from "./repository";

export async function getPaymentController(req: Request, res: Response) {
  const query = await new Repository(mysqlConnections).getAllPayments();
  return res.status(200).json(query);
}
