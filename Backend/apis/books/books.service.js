import dotenv from "dotenv";
import { getRandomString } from "../../services/functions.js";
dotenv.config();

const key = process.env.GOOGLE_TOKEN;

export const booksService = {
  query,
  getById,
};

async function query(filter) {
  try {
    const q = filter.search || getRandomString();
    const baseParams = [
      `q=${q}`,
      `key=${key}`,
      `maxResults=6`,
      "filter=free-ebooks",
      filter.lang ? `langRestrict=${filter.lang}` : "",
      filter.startIndex ? `startIndex=${filter.startIndex}` : "",
      filter.orderBy ? `orderBy=${filter.orderBy}` : "",
    ]
      .filter(Boolean)
      .join("&");
    const url = `https://www.googleapis.com/books/v1/volumes?${baseParams}`;

    let data = await fetchAndParse(url);
    if (!data) throw new Error("Failed to fetch books data.");

    // Запрос для исправления неверного значения `totalItems`
    const totalItemsData = await fetchAndParse(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&filter=free-ebooks&key=${key}&maxResults=6`
    );
    if (totalItemsData) {
      data.totalItems = totalItemsData.totalItems;
    }

    // Обработка случаев, когда `totalItems` < 10
    let tries = 0;
    while (data.totalItems <= 10 && tries < 3) {
      tries++;
      data = await query({ search: getRandomString() });
    }

    delete data.kind;
    data.search = q;

    return data;
  } catch (error) {
    console.error("Error in query function:", error);
  }
}

async function getById(id) {
  try {
    if (!id) throw new Error("Book ID is required.");
    
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
    const data = await fetchAndParse(url);

    if (!data) throw new Error("Book data not found.");
    return data;
  } catch (error) {
    console.error("Error in getById function:", error);
  }
}

async function fetchAndParse(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error in fetchAndParse:", error);
    return null;
  }
}
