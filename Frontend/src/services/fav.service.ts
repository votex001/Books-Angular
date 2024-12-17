import { Book, UserFav } from "../assets/models/favoriteBooks.models";
import { httpService } from "./http.service";

export const favService = {
  getUserFav,
  ifBookInFav,
  addToFavorite,
  deleteFromFavorite,
};

async function ifBookInFav(id?: string | number) {
  if (!id) return false;
  try {
    const userFav = await getUserFav();
    if (userFav) {
      return userFav.books.some((book) => book.id === +id);
    }
    return false;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getUserFav() {
  try {
    return await httpService.get<UserFav>("fav");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addToFavorite(id?: string | number) {
  if (!id) return;
  const book = await httpService.post<Book>("fav", { bookId: id });
  return book;
}

async function deleteFromFavorite(id?: string | number) {
  if (!id) return;
  await httpService.delete(`fav/${id}`);
}
