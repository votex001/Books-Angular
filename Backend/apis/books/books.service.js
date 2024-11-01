import dotenv from "dotenv";
import { getRandomString } from "../../services/functions.js";
import { loggerService } from "../../services/logger.service.js";
dotenv.config();

const key = process.env.GOOGLE_TOKEN;
const PAGE_SIZE = 9

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
      filter.page ? `startIndex=${+filter.page * PAGE_SIZE}` : "",
      filter.orderBy ? `orderBy=${filter.orderBy}` : "",
    ]
      .filter(Boolean)
      .join("&");
    const url = `https://www.googleapis.com/books/v1/volumes?${baseParams}`;

    let data = await fetchAndParse(url);
    if (!data) throw new Error("Failed to fetch books data.");

    // Запрос для исправления неверного значения `totalItems`
    const totalItemsData = await fetchAndParse(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&filter=free-ebooks&key=${key}&maxResults=${PAGE_SIZE}`
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
    data.items = data.items.map((book) => {
      const {
        kind,
        etag,
        selfLink,
        saleInfo,
        accessInfo,
        searchInfo,
        volumeInfo,
        averageRating,
        ratingsCount,
        ...rest
      } = book;

      // Spread `volumeInfo` into `mergedBook` and exclude `industryIdentifiers` if it exists
      const {
        industryIdentifiers,
        panelizationSummary,
        printType,
        canonicalVolumeLink,
        maturityRating,
        allowAnonLogging,
        contentVersion,
        infoLink,
        readingModes,
        ...volumeInfoRest
      } = volumeInfo || {};

      return { ...rest, ...volumeInfoRest };
    });
    return data;
  } catch (error) {
    console.error("Error in query function:", error);
    loggerService.error(e);
  }
}

async function getById(id) {
  try {
    if (!id) throw new Error("Book ID is required.");

    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
    const data = await fetchAndParse(url);

    if (!data) throw new Error("Book data not found.");
    const {
      kind,
      etag,
      selfLink,
      saleInfo,
      accessInfo,
      searchInfo,
      volumeInfo,
      averageRating,
      ratingsCount,
      ...rest
    } = data;
    const {
      industryIdentifiers,
      panelizationSummary,
      printType,
      canonicalVolumeLink,
      maturityRating,
      allowAnonLogging,
      contentVersion,
      infoLink,
      readingModes,
      ...volumeInfoRest
    } = volumeInfo || {};
    return { ...rest, ...volumeInfoRest };

  } catch (error) {
    console.error("Error in getById function:", error);
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
