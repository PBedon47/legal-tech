import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./auth";
import booksRoutes from "./booksRoutes";
import expedienteRoutes from "./expedienteRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/books", booksRoutes);
app.use("/expedientes", expedienteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
