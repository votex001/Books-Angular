import { getCollection } from "../../data/mongo.js";

export const userFavService = {
  getUserBooks,
  save,
};

async function getUserBooks(userId) {
  try {
    const usersBooks = await getCollection("users-books");
    const userFavBooks = await usersBooks.findOne({ userId });
    return userFavBooks;
  } catch (e) {
    console.log(e);
    return res.status(500).send({ err: "Failed to find users books" });
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
      const match = await favBooksCollection.findOne({ "books.id": bookToSave.id });
      if (match) return match;
      userBooks.books.push(bookToSave);
      const result = await favBooksCollection.updateOne(
        { userId },
        { $set: { books: userBooks.books } }
      );
      if (result.matchedCount === 0) {
        throw `Couldn't save books to library of user with id ${userId}`;
      }
    }
    return bookToSave
  } catch (e) {
    console.log(e);
  }
}
