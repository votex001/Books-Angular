import { booksService } from "./books.service.js";

export async function getBooks(req, res) {
  const query = req.query;
  let filter = {};
  filter.search = query.search;
  filter.lang = query.lang;
  filter.orderBy = query.orderBy;
  filter.startIndex = query.startIndex;

  const data = await booksService.query(filter);
  res.send(data);
}

export async function getById(req, res) {
  const query = req.params;
  const data = await booksService.getById(query.id);
  res.send(data);
}
