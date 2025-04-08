import express from "express";
import {
  getInvestmentSummary,
  getGrowthData,
  getHoldings,
} from "../controllers/investmentController";

const router = express.Router();

// Get investment summary
router.get("/summary", getInvestmentSummary);

// Get growth chart data
router.get("/growth", getGrowthData);

// Get holdings
router.get("/holdings", getHoldings);

export default router;
