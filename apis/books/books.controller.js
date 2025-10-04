import { loggerService } from "../../services/logger.service.js";
import { booksService } from "./books.service.js";

export async function getBooks(req, res) {
  try {
    const { search, lang, page } = req.query;
    const filter = {};
    if (search) filter.search = search;
    if (lang && lang !== "all") filter.lang = lang;
    if (page) filter.page = page;

    const data = await booksService.query(filter);
    const filteredData = {
      ...data,
      results: data?.results?.map((book) => {
        delete book.translators;
        delete book.bookshelves;
        delete book.subjects;
        book.authors = book.authors.map((author) => {
          return {
            name: author.name,
          };
        });
        book.cover = book.formats["image/jpeg"];
        delete book.formats;
        delete book["media_type"];
        delete book.copyright;
        return book;
      }),
    };
    delete filteredData.next;
    delete filteredData.previous;
    res.send(filteredData);
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

    const book = await booksService.getById(id);

    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    res.send(book);
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
