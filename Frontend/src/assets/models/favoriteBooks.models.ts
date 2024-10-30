export interface UserFav {
  userId: string;
  books: Book[];
}

export interface Book {
  id: string;
  categories?: string[];
  title: string;
  subtitle?: string;
  authors: string[];
  pageCount: number;
  publishedDate: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  previewLink: string;
}

export interface FavBooksState {
  favBooks: UserFav | null;
}
