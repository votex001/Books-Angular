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
      filter?.sort ? `sort=${filter.sort}` : "",
    ].filter(Boolean);
    const url = `https://gutendex.com/books?${baseParams.join("&")}`;
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
    if (!id) throw new Error("Book ID is required.");

    const url = `https://gutendex.com/books/${id}`;
    const data = await fetchAndParse(url);

    if (!data) throw new Error("Book data not found.Query[data=null]");

    return data;
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
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error in fetchAndParse:", error);
    loggerService.error(error);
    return null;
  }
}
