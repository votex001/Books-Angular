import express from "express";
import { bookTxt, getBooks, getById } from "./books.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id/txt", bookTxt);
router.get("/:id", getById);

export const booksRoutes = router;
