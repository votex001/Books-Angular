import express from "express";
import http from "http";
import cors from "cors";
const app = express();
const server = http.createServer(app);
import cookieParser from "cookie-parser";
import { booksRoutes } from "./apis/books/books.routes.js";

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

//Routes
app.use("/api/books", booksRoutes);

const port = 2027;
server.listen(port, () => {
  console.log(`Server listening on port http://127.0.0.1:${port}`);
});
