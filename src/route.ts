import { Router } from "express";
import { getPaymentController, sumOfPaymentsPerPropertyController } from "./controller";

export const router = Router();

router.get("/payment", getPaymentController);
router.get("/payment/sum", sumOfPaymentsPerPropertyController);
