export interface UserFav {
  userId: string;
  books: Book[];
}

export interface Book {
  id: number;
  authors: { birth_year: number; death_year: number; name: string }[];
  download_count: number;
  formats: {
    "image/jpeg": string;
  };
  languages: string[];
  title: string;
}

export interface FavBooksState {
  favBooks: UserFav | null;
}
