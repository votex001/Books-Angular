import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShelfPaginatorService {
  private booksPerShortShelf: number;
  private booksPerLargeShelf: number;
  private shortShelfIndex: number;
  private totalBooks: number; // This will be set later

  constructor() {
    this.booksPerShortShelf = 9; // Number of books per short shelf
    this.booksPerLargeShelf = 32; // Number of books per large shelf
    this.shortShelfIndex = 1; // Initial short shelf index
    this.totalBooks = 0; // Default value
  }

  // Set the total number of books
  setTotalBooks(totalBooks: number): void {
    this.totalBooks = totalBooks;
  }

  // Set the short shelf index
  setPage(shortShelfIndex: number): void {
    this.shortShelfIndex = shortShelfIndex;
  }

  // Find the pages where books should be placed for the current short shelf
  findPage(page: number) {
    let startIndex;
    if (page) {
      startIndex = (page - 1) * this.booksPerShortShelf;
    } else {
      startIndex = (this.shortShelfIndex - 1) * this.booksPerShortShelf;
    }
    let endIndex = startIndex + this.booksPerShortShelf;

    const firstLargeShelf =
      Math.floor(startIndex / this.booksPerLargeShelf) + 1;
    const lastLargeShelf = Math.floor(endIndex / this.booksPerLargeShelf) + 1;

    const totalLargeShelves = Math.ceil(
      this.totalBooks / this.booksPerLargeShelf
    );
    const validLastLargeShelf = Math.min(lastLargeShelf, totalLargeShelves);

    const result: {
      firstIndex: number;
      lastIndex: number;
      shelfNumber: number[];
    } = {
      firstIndex: startIndex,
      lastIndex: endIndex,
      shelfNumber: [],
    };

    for (let i = firstLargeShelf; i <= validLastLargeShelf; i++) {
      result.shelfNumber.push(i);
    }

    if (result.shelfNumber.length === 1) {
      result.firstIndex = result.firstIndex - 32 * (result.shelfNumber[0] - 1);
      result.lastIndex = result.lastIndex - 32 * (result.shelfNumber[0] - 1);
    } else if (result.shelfNumber.length === 2) {
      result.firstIndex = result.firstIndex - 32 * (result.shelfNumber[0] - 1);
      result.lastIndex = result.lastIndex - 32 * (result.shelfNumber[1] - 2);
    }

    return result;
  }

  // Get the current short shelf index
  getShortShelfIndex(): number {
    return this.shortShelfIndex;
  }

  // Get the total number of books
  getTotalBooks(): number {
    return this.totalBooks;
  }
}
