import express from "express";
import { getBooks } from "./books.controller.js";

const router = express.Router();

router.get("", getBooks);

export const booksRoutes = router;
