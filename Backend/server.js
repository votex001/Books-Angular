import express from "express";
import http from "http";
import cors from "cors";
const app = express();
const server = http.createServer(app);
import cookieParser from "cookie-parser";
import { booksRoutes } from "./apis/books/books.routes.js";
import { authRoutes } from "./apis/auth/auth.routes.js";
import { userRoutes } from "./apis/user/user.routes.js";
import { userFavorites } from "./apis/userFavorites/favorites.routes.js";

const corsOptions = {
  origin: [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api/books", booksRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/fav", userFavorites);

const port = 2027;
server.listen(port, () => {
  console.log(`Server listening on port http://127.0.0.1:${port}`);
});
