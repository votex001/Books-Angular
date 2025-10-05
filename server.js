import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const server = http.createServer(app);
import cookieParser from "cookie-parser";
import { booksRoutes } from "./apis/books/books.routes.js";
import { authRoutes } from "./apis/auth/auth.routes.js";
import { userRoutes } from "./apis/user/user.routes.js";
import { userFavorites } from "./apis/userFavorites/favorites.routes.js";
import path from "path";

const corsOptions = {
  origin: "http://0.0.0.0:4200",
  credentials: true,
};

app.use(express.static("public/browser"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api/books", booksRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/fav", userFavorites);

app.get("/**", (req, res) => {
  res.sendFile(path.resolve("public/browser/index.html"));
});

const port = process.env.PORT || 2027;
server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port http://127.0.0.1:${port}/`);
});
