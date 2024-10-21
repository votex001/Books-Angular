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
    const q = filter.search ? filter.search : getRandomString();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}${
      filter.lang ? "&langRestrict=" + filter.lang : ""
    }${
      filter.startIndex ? "&startIndex=" + filter.startIndex : ""
    }&filter=free-ebooks${
      filter.orderBy ? "&orderBy=" + filter.orderBy : ""
    }&key=${key}&maxResults=6`;
    const res = await fetch(url);
    const data = await res.json();
    // this code only because of problem on Backend of google
    const totalItemsJson = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q}${
        filter.lang ? "&langRestrict=" + filter.lang : ""
      }&filter=free-ebooks${
        filter.orderBy ? "&orderBy=" + filter.orderBy : ""
      }&key=${key}&maxResults=6`
    );
    const totalItems = await totalItemsJson.json();
    data.totalItems = totalItems.totalItems;
    // this solves problem of wrong total items result when startIndex > 0
    delete data.kind;
    data.search = q;
    let tries = 0;
    if (data.totalItems > 10 || tries !== 4) {
      return data;
    } else {
      tries++;
      const ans = await query();
      return ans;
    }
  } catch (er) {
    console.log(er);
  }
}

async function getById(id) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    const data = await res.json();
    return data;
  } catch (er) {
    console.log(er);
  }
}
