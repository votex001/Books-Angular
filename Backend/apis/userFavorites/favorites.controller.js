import { loggerService } from "../../services/logger.service.js";
import { booksService } from "../books/books.service.js";
import { userFavService } from "./favorites.service.js";

export async function myFav(req, res) {
  try {
    const userId = req.loggedinUser.id;
    const userBooks = await userFavService.getUserBooks(userId);
    // if (!userBooks) return res.status(404).send({ error: "Books not found" });
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
    const ans = await userFavService.save(userId, book);
    console.log(userId);
    res.send(ans);
  } catch (e) {
    console.log(e);
    loggerService.error(e);
    res.status(500).send({ error: "Couldn't save books to library of user" });
  }
}

export async function deleteBookFromFav(req, res) {
  try {
    const userId = req.loggedinUser.id;
    const { bookId } = req.params;
    await userFavService.deleteBook(userId, bookId);
    res.send("Book deleted");
  } catch (e) {
    console.log(e);
    loggerService.error(e);
    return res
      .status(500)
      .send({ error: "Couldn't save books to library of user" });
  }
}
