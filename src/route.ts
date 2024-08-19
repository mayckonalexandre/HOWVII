import { Router } from "express";
import { getPaymentController } from "./controller";

export const router = Router();

router.get("/payment", getPaymentController);
