import express from "express";
import http from "http";
import cors from "cors";
const app = express();
const server = http.createServer(app);
import cookieParser from "cookie-parser";

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

app.get("/api/books", (req, res) => {
  res.send("hello world");
});

const port = 2027;
server.listen(port, () => {
  console.log(`Server listening on port http://127.0.0.1:${port}`);
});
