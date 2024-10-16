import { booksService } from "./books.service.js";

export async function getBooks(req, res) {
  const data = await booksService.query();
  res.send(data);
}
