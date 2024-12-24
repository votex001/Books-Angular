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
