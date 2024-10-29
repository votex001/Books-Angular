export interface UserFav {
  userId: string;
  books: Book[];
}

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string;
    pageCount: number;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    previewLink: string;
  };
}

export interface FavBooksState {
  favBooks: UserFav | null;
}
