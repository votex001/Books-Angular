import { ObjectId } from "mongodb";
import { getCollection } from "../../data/mongo.js";
import { loggerService } from "../../services/logger.service.js";

export const userFavService = {
  getUserBooks,
  save,
  deleteBook,
};

async function getUserBooks(userId) {
  try {
    const usersBooks = await getCollection("users-books");
    const userFavBooks = await usersBooks.findOne({
      userId: new ObjectId(String(userId)),
    });
    console.log(userId);
    return userFavBooks;
  } catch (e) {
    console.log(e);
    return res.status(500).send({ err: "Failed to find users books" });
  }
}

async function deleteBook(userId, bookId) {
  try {
    const userBooks = await getCollection("users-books");
    const result = await userBooks.updateOne(
      { userId: new ObjectId(String(userId)) }, // Find document by userId
      { $pull: { books: { id: +bookId } } } // Remove book with matching bookId
    );
    if (result.modifiedCount === 0) {
      throw "Cannot found this book";
    }
  } catch (err) {
    console.log(err);
    loggerService.error(err);
  }
}

async function save(userId, bookToSave) {
  try {
    const userBooks = await getUserBooks(userId);
    const favBooksCollection = await getCollection("users-books");
    if (!userBooks) {
      const newFavLib = {
        userId,
        books: [bookToSave],
      };
      favBooksCollection.insertOne(newFavLib);
    } else {
      const match = await favBooksCollection.findOne({
        "books.id": bookToSave.id,
      });
      if (match) return match;
      userBooks.books.push(bookToSave);
      const result = await favBooksCollection.updateOne(
        { userId: new ObjectId(String(userId)) },
        { $set: { books: userBooks.books } }
      );
      if (result.matchedCount === 0) {
        throw `Couldn't save books to library of user with id ${userId}`;
      }
    }
    return bookToSave;
  } catch (e) {
    console.log(e);
    loggerService.error(e);
  }
}
