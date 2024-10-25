import { booksService } from "./books.service.js";

export async function getBooks(req, res) {
  try {
    const { search, lang, orderBy, startIndex } = req.query;
    const filter = {};

    if (search) filter.search = search;
    if (lang) filter.lang = lang;
    if (orderBy) filter.orderBy = orderBy;
    if (startIndex) filter.startIndex = startIndex;

    const data = await booksService.query(filter);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch books", details: error.message });
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
    res.status(500).send({ error: "Failed to fetch book by ID", details: error.message });
  }
}
