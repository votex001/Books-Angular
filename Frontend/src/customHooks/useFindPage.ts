class UseFindPage {
    private booksPerShortShelf: number;
    private booksPerLargeShelf: number;
    private totalBooks: number;
    private shortShelfIndex: number;

    constructor(totalBooks: number) {
        this.booksPerShortShelf = 9; // Количество книг на короткой полке
        this.booksPerLargeShelf = 32; // Количество книг на большой полке
        this.totalBooks = totalBooks;
        this.shortShelfIndex = 1; // Начальный номер короткой полки
    }

    // Устанавливаем номер короткой полки
    setPage(shortShelfIndex: number) {
        this.shortShelfIndex = shortShelfIndex;
    }

    // Устанавливаем общее количество книг
    setTotalBooks(totalBooks: number) {
        this.totalBooks = totalBooks;
    }

    // Находим страницы, где должны быть размещены книги для текущей короткой полки
    findPage() {
        const startIndex = (this.shortShelfIndex - 1) * this.booksPerShortShelf; // Индекс первой книги на короткой полке
        const endIndex = this.shortShelfIndex * this.booksPerShortShelf - 1; // Индекс последней книги на короткой полке

        const firstLargeShelf = Math.floor(startIndex / this.booksPerLargeShelf) + 1; // Номер первой большой полки
        const lastLargeShelf = Math.floor(endIndex / this.booksPerLargeShelf) + 1; // Номер последней большой полки

        // Рассчитываем, сколько больших полок существует
        const totalLargeShelves = Math.ceil(this.totalBooks / this.booksPerLargeShelf);
        const validLastLargeShelf = Math.min(lastLargeShelf, totalLargeShelves);

        const sliceIndices = [];

        // Ищем книги на нужных больших полках
        for (let i = firstLargeShelf; i <= validLastLargeShelf; i++) {
            const firstBook = Math.max((i - 1) * this.booksPerLargeShelf, startIndex); // Первый индекс книги на большой полке
            const lastBook = Math.min(i * this.booksPerLargeShelf - 1, endIndex); // Последний индекс книги на большой полке

            sliceIndices.push({
                shelfNumber: i,
                firstIndex: firstBook,
                lastIndex: lastBook,
            });
        }

        return sliceIndices;
    }

    // Получаем текущий номер короткой полки
    getShortShelfIndex() {
        return this.shortShelfIndex;
    }

    // Получаем общее количество книг
    getTotalBooks() {
        return this.totalBooks;
    }
}

export default UseFindPage;
