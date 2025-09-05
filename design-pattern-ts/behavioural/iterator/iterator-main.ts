import { WordCollection } from './collections/word-collection';
import { BookCollection, Book } from './collections/book-collection';
import { Iterator } from './interfaces/iterator';


function demonstrateIteratorPattern(){

    const wordCollection = new WordCollection();
    wordCollection.addWord('Design');
    wordCollection.addWord('Patterns');
    wordCollection.addWord('Are');
    wordCollection.addWord('Awesome');

    console.log('Forward iteration:');
    const wordIterator = wordCollection.createIterator();
    while (wordIterator.hasNext()) {
        const word = wordIterator.next();
        console.log(`-> ${word}`);
    }

    console.log('\nReverse iteration:');
    const reverseWordIterator = wordCollection.createReverseIterator();
    while (reverseWordIterator.hasNext()) {
        const word = reverseWordIterator.next();
        console.log(`-> ${word}`);
    }


    console.log('\n\nExample 2: Book Collection Iterator');
    console.log('=====================================');

    const bookCollection = new BookCollection();
    bookCollection.addBook('Clean Code', 'Robert C. Martin', 2008, 'Programming');
    bookCollection.addBook('Design Patterns', 'Gang of Four', 1994, 'Programming');
    bookCollection.addBook('The Pragmatic Programmer', 'Andrew Hunt', 1999, 'Programming');
    bookCollection.addBook('1984', 'George Orwell', 1949, 'Fiction');
    bookCollection.addBook('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction');


    // Forward iteration through books
    console.log('Forward iteration through books:');
    const bookIterator = bookCollection.createIterator();
    while (bookIterator.hasNext()) {
        const book = bookIterator.next();
        if (book) {
            console.log(`-> "${book.title}" by ${book.author} (${book.year}) - ${book.genre}`);
        }
    }

    console.log('\nReverse iteration through books:');
    const reverseBookIterator = bookCollection.createReverseIterator();
    while (reverseBookIterator.hasNext()) {
        const book = reverseBookIterator.next();
        if (book) {
            console.log(`-> "${book.title}" by ${book.author} (${book.year}) - ${book.genre}`);
        }
    }
};

demonstrateIteratorPattern();