import { Request, Response } from "express";
import db from "../config/db";

export const createPortfolio = async (req: any, res: Response) => {
  const { title, category, imageSrc } = req.body;
  try {
    const [rows] = await db.execute(
      "INSERT INTO portfolios (title, category, imageSrc, user_id) VALUES (?, ?, ?, ?)",
      [title, category, imageSrc, req.user.id]
    );
    res.status(201).send("Portfolio created");
  } catch (error) {
    res.status(500).send("Error creating portfolio");
  }
};

export const getPortfolios = async (req: any, res: Response) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM portfolios WHERE user_id = ?",
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).send("Error fetching portfolios");
  }
};
