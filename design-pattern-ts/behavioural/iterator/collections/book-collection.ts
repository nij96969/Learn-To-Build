import { Iterable } from '../interfaces/iterable';
import { Iterator } from '../interfaces/iterator';
import { ListIterator } from '../iterators/list-iterator';
import { ReverseListIterator } from '../iterators/reverse-list-iterator';

/**
 * Book Interface
 * Represents a book with basic properties
 */
export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    genre: string;
}

/**
 * Book Collection
 * 
 * A more complex concrete collection that implements the Iterable interface.
 * This collection stores Book objects and provides iterators for traversal.
 * Demonstrates how the Iterator pattern works with complex objects.
 */
export class BookCollection implements Iterable<Book> {
    private books: Book[] = [];
    private nextId: number = 1;

    addBook(title: string, author: string, year: number, genre: string): Book {
        const book: Book = {
            id: this.nextId++,
            title,
            author,
            year,
            genre
        };
        this.books.push(book);
        return book;
    }

    removeBook(id: number): boolean {
        const index = this.books.findIndex(book => book.id === id);
        if (index > -1) {
            this.books.splice(index, 1);
            return true;
        }
        return false;
    }

    getBooks(): Book[] {
        return [...this.books]; // Return a copy to prevent external modification
    }

    createIterator(): Iterator<Book> {
        return new ListIterator<Book>(this.books);
    }

    createReverseIterator(): Iterator<Book> {
        return new ReverseListIterator<Book>(this.books);
    }

    clear(): void {
        this.books = [];
        this.nextId = 1;
    }
}
