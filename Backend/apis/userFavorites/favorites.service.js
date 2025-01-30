import { ObjectId } from "mongodb";
import { getCollection } from "../../data/mongo.js";
import { loggerService } from "../../services/logger.service.js";

export const userFavService = {
  getUserBooks,
  save,
  deleteBook,
};

async function getUserBooks(filter, userId) {
  try {
    const { search, lang, page, booksPerPage } = filter;
    const usersBooks = await getCollection("users-books");
    const userFavBooks = await usersBooks.findOne({
      userId: new ObjectId(String(userId)),
    });

    // Guard for booksPerPage
    const maxBooksPerPage = 50;
    const validBooksPerPage =
      typeof booksPerPage === "number" && booksPerPage > 0
        ? Math.min(booksPerPage, maxBooksPerPage)
        : 6; // default pages

    // Filter books
    let filteredBooks = userFavBooks.books.filter((book) => {
      const matchesSearch = search
        ? book.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesLang = lang
        ? lang === "all" || book.languages.includes(lang)
        : true;
      return matchesSearch && matchesLang;
    });

    // Pagination
    const totalBooks = filteredBooks.length;
    const totalPages = Math.ceil(totalBooks / validBooksPerPage);
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    const firstIndex = validBooksPerPage * (pageNumber - 1);
    const lastIndex = firstIndex + validBooksPerPage;
    const paginatedBooks = filteredBooks.slice(firstIndex, lastIndex);
    return {
      books: paginatedBooks,
      results: totalBooks,
      totalPages,
      currentPage: pageNumber,
    };
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
    const usersBooks = await getCollection("users-books");
    const userFavBooks = await usersBooks.findOne({
      userId: new ObjectId(String(userId)),
    });
    const favBooksCollection = await getCollection("users-books");
    if (!userFavBooks) {
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
      userFavBooks.books.push(bookToSave);
      const result = await favBooksCollection.updateOne(
        { userId: new ObjectId(String(userId)) },
        { $set: { books: userFavBooks.books } }
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
