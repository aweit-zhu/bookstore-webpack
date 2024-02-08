import { books,Book,BookType,BookTypes } from './data.js';

/**
 * 
 * @returns {Array<BookType>}
 */
export function findAllBookTypes() {

    let bookTypes = JSON.parse(window.sessionStorage.getItem('bookTypes'));

    if(bookTypes ==null) {
        // @ts-ignore
        window.sessionStorage.setItem('bookTypes', JSON.stringify(Object.values(BookTypes)));
        bookTypes = JSON.parse(window.sessionStorage.getItem('bookTypes'));
    } 

    // 轉型成Booktype
    bookTypes = bookTypes.map(bookType => new BookType(bookType.typeId, bookType.typeName,bookType.color));

    return bookTypes;
}

/**
 * 
 * @param {string} typeName 
 * @returns {BookType | null}
 */
export function findBookTypeByTypeName(typeName) {

    let bookTypes = findAllBookTypes().filter(bt => bt.typeName == typeName);

    return bookTypes.length == 1 ? bookTypes[0]: null;
}

/**
 * 
 * @returns {Array<Book>}
 */
export function findAllBooks() {
    return getBooks();
}

/**
 * 
 * @param {number} bookId 
 * @returns  {Book | null}
 */
export function findBookById(bookId) {

    const findBook = getBooks().filter(book => book.id == bookId);

    return findBook.length == 0 ? null: findBook[0];
}

/**
 * 
 * @param {Array<Book>} books 
 * @param {number} bookId 
 * @returns { Book | null }
 */
export function findBookByBooksAndId(books,bookId) {

    const findBook = books.filter(book => book.id == bookId);

    return findBook.length == 0 ? null: findBook[0];
}

/**
 * 
 * @param {string} bookTypeName 
 * @returns {Array<Book>}
 */
export function findBooksByTypeName(bookTypeName) {
    return getBooks().filter(book => book.type.typeName == bookTypeName);
}

/**
 * 
 * @param {number} bookId 
 * @param {number} qty 
 * @returns {string}
 */
export function minusBookSotckByBookId(bookId, qty) {
   let books = getBooks();
   let message = '';
   books.filter(book => book.id == bookId).forEach(book=> {
        if(book.stockQty - qty < 0) {
            message = `${book.name} 已經無庫存`;
        } else {
            book.stockQty = book.stockQty - qty;
        }
   });

   if(message == '')saveBooks(books);
   return message;
}

/**
 * 
 * @param { Book } updateBook
 * @returns { number }
 */
export function saveBook(updateBook) {
    let books = getBooks();
    try {
        let existingBook = findBookByBooksAndId(books, updateBook.id);
        if(existingBook == null) {
            throw Error(`Not Found: Book Id - ${updateBook.id}`);
        }
        Object.assign(existingBook, updateBook);

        if(existingBook.stockQty < 0 ) {
            throw Error(`Stock Qty Error: Book Id - ${updateBook.id}`);
        }

        saveBooks(books);
        return 1;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {number} bookId 
 * @returns { number }
 */
export function deleteBookById(bookId) {
    let books = getBooks();
    try {
        let existingBook = findBookByBooksAndId(books, bookId);
        if(existingBook == null) {
            throw Error(`Not Found: Book Id - ${bookId}`);
        }
        books = books.filter(book=> book.id != bookId);
        saveBooks(books);
        return 1;
    } catch (error) {
        throw error;
    }
    return 1;
}

/**
 * 
 * @param {Array<Book>} books 
 */
function saveBooks(books) {
    window.sessionStorage.setItem('books', JSON.stringify([...books]));
}

/**
 * 
 * @returns {Array<Book>}
 */
function getBooks() {

    let sessionBooks = JSON.parse(window.sessionStorage.getItem('books'));

    if(sessionBooks ==null) {
        saveBooks(books);
        sessionBooks = JSON.parse(window.sessionStorage.getItem('books'));
    } 

    [...sessionBooks].map(book=> {
        // @ts-ignore
        Object.setPrototypeOf(book, Book.prototype);
    });

    return sessionBooks;
}