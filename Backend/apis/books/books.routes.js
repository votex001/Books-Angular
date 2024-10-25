import express from "express";
import { getBooks, getById } from "./books.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getById);

export const booksRoutes = router;
