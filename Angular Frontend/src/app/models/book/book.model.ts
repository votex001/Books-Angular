import { count } from 'rxjs';

export interface UserFav {
  books: Book[];
}

export interface Book {
  id: number;
  authors: { name: string }[];
  download_count: number;
  cover: string;
  languages: Lang[];
  title: string;
  subjects: string[];
}
export type Lang =
  | 'all' // all
  | 'en' // English
  | 'ru' // Russian
  | 'es' // Spanish
  | 'zh' // Chinese
  | 'hi' // Hindi
  | 'he'; // Hebrew

export interface FavBooksState {
  favBooks: UserFav | null;
}

export interface SearchFilter {
  lang: Lang;
  page: number;
  search: string;
}
export interface booksFetch {
  count: number;
  results: Book[];
}
