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
    imageSrc: z.string().min(1, "ImageSrc is required"),
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

// delete portfolio
export const deletePortfolio = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM portfolios WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 1) {
      res.status(200).send("Portfolio deleted successfully");
    } else {
      res.status(404).send("Portfolio not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting portfolio");
  }
};
