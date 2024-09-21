import { Router } from "express";
import {
  createPortfolio,
  getPortfolios,
} from "../controllers/portfolioController";
import { authenticateToken } from "../middlewares/authMiddleware";

const portfolioRoutes = Router();

portfolioRoutes.post("/", authenticateToken, createPortfolio);
portfolioRoutes.get("/", authenticateToken, getPortfolios);

export default portfolioRoutes;
