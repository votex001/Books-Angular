import { count } from 'rxjs';

export interface UserFav {
  books: Book[];
}

export interface Book {
  id: number;
  authors: { name: string }[];
  download_count: number;
  cover: string;
  languages: string[];
  title: string;
  subjects: string[];
}

export interface FavBooksState {
  favBooks: UserFav | null;
}
type lang =
  | 'all' // all
  | 'en' // English
  | 'ru' // Russian
  | 'es' // Spanish
  | 'zh' // Chinese
  | 'hi' // Hindi
  | 'he'; // Hebrew

export interface SearchFilter {
  lang: lang;
  page: number;
  search: string;
}
export interface booksFetch {
  count: number;
  results: Book[];
}
