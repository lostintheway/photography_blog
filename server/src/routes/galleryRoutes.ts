import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { createGallery, getGalleries } from "../controllers/galleryController";

const galleryRoutes = Router();

galleryRoutes.post("/", authenticateToken, createGallery);
galleryRoutes.get("/", authenticateToken, getGalleries);

export default galleryRoutes;
