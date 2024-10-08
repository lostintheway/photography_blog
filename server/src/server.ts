import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import portfolioRoutes from "./routes/portfolioRoutes";
import galleryRoutes from "./routes/galleryRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { createTablesOnStartup } from "./config/db";

const app = express();

// Define allowed domains
const allowedDomains = ["http://localhost:3000", "http://localhost:3005"]; // Replace with your domains

// Configure CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedDomains.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//server uploads folder
app.use("/images", express.static("uploads"));

createTablesOnStartup();

app.use("/api/users", userRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
