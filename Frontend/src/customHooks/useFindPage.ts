class UseFindPage {
  private booksPerShortShelf: number;
  private booksPerLargeShelf: number;
  private totalBooks: number;
  private shortShelfIndex: number;

  constructor(totalBooks: number) {
    this.booksPerShortShelf = 9; // Number of books per short shelf
    this.booksPerLargeShelf = 32; // Number of books per large shelf
    this.totalBooks = totalBooks;
    this.shortShelfIndex = 1; // Initial short shelf index
  }

  // Set the short shelf index
  setPage(shortShelfIndex: number) {
    this.shortShelfIndex = shortShelfIndex;
  }

  // Set the total number of books
  setTotalBooks(totalBooks: number) {
    this.totalBooks = totalBooks;
  }

  // Find the pages where books should be placed for the current short shelf
  findPage() {
    // Define the range for this page
    let startIndex = (this.shortShelfIndex - 1) * this.booksPerShortShelf;
    let endIndex = startIndex + this.booksPerShortShelf; // Now we want last index to be exclusive, e.g., 0-9 for page 1

    // Define the large shelf numbers that the books on this page belong to
    const firstLargeShelf =
      Math.floor(startIndex / this.booksPerLargeShelf) + 1;
    const lastLargeShelf = Math.floor(endIndex / this.booksPerLargeShelf) + 1;

    // Calculate the total number of large shelves
    const totalLargeShelves = Math.ceil(
      this.totalBooks / this.booksPerLargeShelf
    );
    const validLastLargeShelf = Math.min(lastLargeShelf, totalLargeShelves);

    // Initialize the result with first and last index for this page
    const result: {
      firstIndex: number;
      lastIndex: number;
      shelfNumber: number[];
    } = {
      firstIndex: startIndex,
      lastIndex: endIndex,
      shelfNumber: [],
    };

    // Add the relevant large shelves to the result
    for (let i = firstLargeShelf; i <= validLastLargeShelf; i++) {
      result.shelfNumber.push(i); // Add the shelf number to the array
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
  getShortShelfIndex() {
    return this.shortShelfIndex;
  }

  // Get the total number of books
  getTotalBooks() {
    return this.totalBooks;
  }
}

export default UseFindPage;
