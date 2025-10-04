import dotenv from "dotenv";
import { loggerService } from "../../services/logger.service.js";
dotenv.config();

export const booksService = {
  query,
  getById,
  bookToTxt,
};

async function query(filter) {
  try {
    const baseParams = [
      filter?.search ? `search=${filter.search}` : "",
      filter?.lang ? `languages=${filter.lang}` : "",
      filter?.page ? `page=${filter.page}` : "",
    ].filter(Boolean);
    const url = baseParams.toString()?`https://gutendex.com/books?${baseParams.join("&")}`:`https://gutendex.com/books`;
    let data = await fetchAndParse(url);
    if (!data) {
      throw new Error("Failed to fetch books data. Query[data=null]");
    }

    return data;
  } catch (error) {
    console.error("Error in query function:", error);
    loggerService.error(error);
  }
}

async function getById(id) {
  try {
    if (!id) {
      throw "Book ID is required.";
    }
    const url = `https://gutendex.com/books/${id}`;
    const book = await fetchAndParse(url);

    if (!book) throw new Error("Book data not found.Query[data=null]");
    delete book.translators;
    delete book.bookshelves;
    book.cover = book.formats["image/jpeg"];
    book.authors = book.authors.map((author) => {
      return {
        name: author.name,
      };
    });
    delete book.formats;
    delete book["media_type"];
    delete book.copyright;
    return book;
  } catch (error) {
    console.error("Error in getById function:", error);
    loggerService.error(error);
  }
}

async function bookToTxt(id) {
  try {
    if (!id) throw new Error("Book ID is required.");

    // const response = await fetch(
    //   `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`
    // );
    const response = await fetch(
      `https://www.gutenberg.org/cache/epub/${id}/pg${id}-images.html`
    );
    const data = await response.text();

    if (!data) throw new Error("Book data not found.Query[data=null]");

    return data;
  } catch (error) {
    console.error("Error in bookToTxt function:", error);
    loggerService.error(error);
  }
}

async function fetchAndParse(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`[fetchAndParse]Failed to fetch: ${res.statusText}`);
    console.log(res)
    return await res.json();
  } catch (error) {
    console.error("Error in fetchAndParse:", error);
    loggerService.error(error);
    return null;
  }
}
