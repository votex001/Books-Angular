import dotenv from "dotenv";
import { getRandomString } from "../../services/functions.js";
dotenv.config();

const key = process.env.GOOGLE_TOKEN;

export const booksService = {
  query,
};

async function query() {
  try {
    const q = getRandomString();
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=ru&filter=ebooks&key=${key}`
    );
    const data = await res.json();
    if (data.totalItems > 10) {
      return data;
    } else {
      console.log("lol");
      const ans = await query();
      return ans;
    }
  } catch (er) {
    console.log(er);
  }
}
