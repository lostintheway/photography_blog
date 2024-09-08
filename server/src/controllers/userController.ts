import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db";
import { RowDataPacket } from "mysql2";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

interface User extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (rows.length === 0) return res.status(400).send("User not found");

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};
