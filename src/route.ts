import { Router } from "express";
import { getPaymentController, getSalesByDate, sumOfPaymentsPerPropertyController } from "./controller";

export const router = Router();

router.get("/payment", getPaymentController);
router.get("/payment/sum", sumOfPaymentsPerPropertyController);
router.get("/orders", getSalesByDate);
