import { Router } from "express";
import {
  getPaymentController,
  getSalesByDateController,
  sumOfPaymentsPerPropertyController,
  percentageByTypeOfPropertyController,
} from "./controller";

export const router = Router();

router.get("/payment", getPaymentController);
router.get("/payment/sum", sumOfPaymentsPerPropertyController);
router.get("/orders", getSalesByDateController);
router.get("/property/percentage", percentageByTypeOfPropertyController);
