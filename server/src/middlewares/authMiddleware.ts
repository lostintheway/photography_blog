import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
}

export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");

  const bearer = token.split(" ");
  const tokenValue = bearer[1] || bearer[0];

  jwt.verify(
    tokenValue,
    process.env.JWT_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }
      req.user = user as JwtPayload;
      next();
    }
  );
};
