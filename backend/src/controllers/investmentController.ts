import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

// Load mock data from JSON files
const investmentsPath = path.join(__dirname, "../mock-data/investments.json");
const portfolioPath = path.join(__dirname, "../mock-data/portfolio.json");

const investmentsData = JSON.parse(fs.readFileSync(investmentsPath, "utf8"));
const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, "utf8"));

/**
 * Get investment summary for a user
 * @param req Request object with userId query parameter
 * @param res Response object
 */
export const getInvestmentSummary = (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || "child_001";
  const userPortfolio = portfolioData[userId];
  const userInvestments = investmentsData[userId];

  if (!userPortfolio || !userInvestments) {
    return res.status(404).json({ message: "Investment data not found" });
  }

  // Combine portfolio and investments data
  const summary = {
    totalValue: userPortfolio.portfolioValue,
    monthlyChange: userPortfolio.monthlyChange,
    holdings: userInvestments,
  };

  res.json(summary);
};

/**
 * Get growth chart data for a user
 * @param req Request object with userId query parameter
 * @param res Response object
 */
export const getGrowthData = (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || "child_001";
  const userPortfolio = portfolioData[userId];

  if (!userPortfolio) {
    return res.status(404).json({ message: "Portfolio data not found" });
  }

  // Format historical values for the frontend
  const growthData = userPortfolio.historicalValues.map((item: any) => ({
    date: item.date.split("-")[0] + "-" + item.date.split("-")[1], // Format as YYYY-MM
    value: item.value,
  }));

  res.json(growthData);
};

/**
 * Get holdings for a user
 * @param req Request object with userId query parameter
 * @param res Response object
 */
export const getHoldings = (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || "child_001";
  const userInvestments = investmentsData[userId];

  if (!userInvestments) {
    return res.status(404).json({ message: "Holdings data not found" });
  }

  res.json(userInvestments);
}; 