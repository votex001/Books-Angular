import { loggerService } from "../../services/logger.service.js";
import { booksService } from "../books/books.service.js";
import { userFavService } from "./favorites.service.js";

export async function myFav(req, res) {
  try {
    const { search, lang, page, booksPerPage } = req.query;
    const userId = req.loggedinUser.id;
    const userBooks = await userFavService.getUserBooks(
      {
        search,
        lang,
        ...(page ? { page: +page } : { page: 1 }),
        ...(booksPerPage
          ? { booksPerPage: +booksPerPage }
          : { booksPerPage: 6 }),
      },
      userId
    );
    res.send(userBooks);
  } catch (e) {
    console.log(e);
    loggerService.error(e);
    return res.status(500).send({ error: "Books not found" });
  }
}

export async function postMyFovBook(req, res) {
  try {
    const userId = req.loggedinUser.id;
    const { bookId } = req.body;
    const book = await booksService.getById(bookId);
    if (!book) {
      return res
        .status(500)
        .json({ error: "Couldn't save books to library of user" });
    }
    const savedBook = await userFavService.save(userId, book);
    res.send(savedBook);
  } catch (e) {
    console.log(e);
    loggerService.error(e);
    res.status(500).json({ error: "Couldn't save books to library of user" });
  }
}

export async function deleteBookFromFav(req, res) {
  try {
    const userId = req.loggedinUser.id;
    const { bookId } = req.params;
    await userFavService.deleteBook(userId, bookId);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    loggerService.error(e);
    return res
      .status(500)
      .send({ error: "Couldn't save books to library of user" });
  }
}
