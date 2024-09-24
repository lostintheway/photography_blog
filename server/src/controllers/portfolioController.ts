import { Request, Response } from "express";
import db from "../config/db";
import { z } from "zod";
import { ResultSetHeader } from "mysql2";

export const createPortfolio = async (req: any, res: Response) => {
  const { title, category, imageSrc } = req.body;

  // Validate user input
  const createPortfolioSchema = z.object({
    title: z.string().min(1, "Title is required"),
    category: z.enum(["wedding", "portrait", "nature"], {
      required_error: "Please select a category",
    }),
    imageSrc: z.string().url(),
  });

  const result = createPortfolioSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send(result.error.issues);
  }

  try {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO portfolios (title, category, imageSrc) VALUES (?, ?, ?)",
      [title, category, imageSrc]
    );

    if (result.affectedRows === 1) {
      res.status(201).send("Portfolio created successfully");
    } else {
      res.status(500).send("Error creating portfolio");
    }
  } catch (error) {
    res.status(500).send("Error creating portfolio");
  }
};

export const getPortfolios = async (req: any, res: Response) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM portfolios ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).send("Error fetching portfolios");
  }
};
