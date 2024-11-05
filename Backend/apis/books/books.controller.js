import { loggerService } from "../../services/logger.service.js";
import { booksService } from "./books.service.js";

export async function getBooks(req, res) {
  try {
    const { search, lang, page, sort } = req.query;
    const filter = {};
    if (search) filter.search = search;
    if (lang) filter.lang = lang;
    if (page) filter.page = page;
    if (sort) filter.sort = sort;

    const data = await booksService.query(filter);
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch books", details: error.message });
    loggerService.error(error);
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: "Book ID is required" });
    }

    const data = await booksService.getById(id);

    if (!data) {
      return res.status(404).send({ error: "Book not found" });
    }

    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch book by ID", details: error.message });
    loggerService.error(error);
  }
}

export async function bookTxt(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ error: "Book ID is required" });
    }
    const data = await booksService.bookToTxt(id);
    if (!data) {
      return res.status(404).send({ error: "Book not found" });
    }
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch book by ID", details: error.message });
    loggerService.error(error);
  }
}
