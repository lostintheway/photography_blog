import { Response } from "express";
import db from "../config/db";

export const createGallery = async (req: any, res: Response) => {
  const { title, imageSrc } = req.body;
  try {
    const [rows] = await db.execute(
      "INSERT INTO galleries (title, imageSrc) VALUES (?, ?)",
      [title, imageSrc, req.user.id]
    );
    res.status(201).send("Gallery created");
  } catch (error) {
    res.status(500).send("Error creating gallery");
  }
};

export const getGalleries = async (req: any, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM galleries ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).send("Error fetching galleries");
  }
};
