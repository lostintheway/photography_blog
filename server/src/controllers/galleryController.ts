import { Response } from "express";
import db from "../config/db";
import { z } from "zod";
import { ResultSetHeader } from "mysql2";

export const createGallery = async (req: any, res: Response) => {
  const { title, imageSrc } = req.body;

  // Validate user input
  const createGallerySchema = z.object({
    title: z.string().min(1, "Title is required"),
    imageSrc: z.string().min(1, "ImageSrc is required"),
  });

  const result = createGallerySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send(result.error.issues);
  }

  try {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO galleries (title, imageSrc, userId) VALUES (?, ?, ?)",
      [title, imageSrc, req.user.id]
    );

    if (result.affectedRows === 1) {
      res.status(201).send("Gallery created successfully");
    } else {
      res.status(500).send("Error creating gallery");
    }
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
