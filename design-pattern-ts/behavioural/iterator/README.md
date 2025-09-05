# Iterator Pattern

 ##Applicability
 ```
 Use the Iterator pattern when your collection has a complex data structure under the hood, but you want to hide its complexity from clients (either for convenience or security reasons).

 The iterator encapsulates the details of working with a complex data structure, providing the client with several simple methods of accessing the collection elements. While this approach is very convenient for the client, it also protects the collection from careless or malicious actions which the client would be able to perform if working with the collection directly.

 Use the pattern to reduce duplication of the traversal code across your app.

 The code of non-trivial iteration algorithms tends to be very bulky. When placed within the business logic of an app, it may blur the responsibility of the original code and make it less maintainable. Moving the traversal code to designated iterators can help you make the code of the application more lean and clean.

 Use the Iterator when you want your code to be able to traverse different data structures or when types of these structures are unknown beforehand.

 The pattern provides a couple of generic interfaces for both collections and iterators. Given that your code now uses these interfaces, it’ll still work if you pass it various kinds of collections and iterators that implement these interfaces.
```
##How to Implement
```
Declare the iterator interface. At the very least, it must have a method for fetching the next element from a collection. But for the sake of convenience you can add a couple of other methods, such as fetching the previous element, tracking the current position, and checking the end of the iteration.

Declare the collection interface and describe a method for fetching iterators. The return type should be equal to that of the iterator interface. You may declare similar methods if you plan to have several distinct groups of iterators.

Implement concrete iterator classes for the collections that you want to be traversable with iterators. An iterator object must be linked with a single collection instance. Usually, this link is established via the iterator’s constructor.

Implement the collection interface in your collection classes. The main idea is to provide the client with a shortcut for creating iterators, tailored for a particular collection class. The collection object must pass itself to the iterator’s constructor to establish a link between them.

Go over the client code to replace all of the collection traversal code with the use of iterators. The client fetches a new iterator object each time it needs to iterate over the collection elements.
```

## Overview

The Iterator Pattern is a behavioral design pattern that provides a way to access elements of a collection sequentially without exposing the underlying representation of the collection. It encapsulates the traversal logic and allows clients to iterate through elements uniformly, regardless of the collection's internal structure.

## Intent

- Provide a way to access elements of an aggregate object sequentially without exposing its underlying representation
- Support multiple traversals of aggregate objects
- Provide a uniform interface for traversing different aggregate structures

## Problem

When working with collections of objects, you often need to traverse through all elements. However, different collections may have different internal structures (arrays, linked lists, trees, etc.), and exposing these structures to client code creates tight coupling. Additionally, you might need different ways to traverse the same collection (forward, backward, filtered, etc.).



## Solution

The Iterator pattern solves this by:
1. Extracting the traversal behavior into separate iterator objects
2. Providing a common interface for all iterators
3. Allowing collections to create different types of iterators
4. Keeping the collection's internal structure hidden from clients

## Structure

### Core Components

1. **Iterator Interface** (`Iterator<T>`)
   - Defines the interface for accessing and traversing elements
   - Methods: `next()`, `hasNext()`, `current()`, `reset()`

2. **Iterable Interface** (`Iterable<T>`)
   - Defines the interface for collections that can be iterated
   - Methods: `createIterator()`, `createReverseIterator()`

3. **Concrete Iterators**
   - `ListIterator<T>`: Forward iteration through collections
   - `ReverseListIterator<T>`: Backward iteration through collections

4. **Concrete Collections**
   - `WordCollection`: Collection of strings
   - `BookCollection`: Collection of Book objects

## Implementation

### 1. Iterator Interface

```typescript
export interface Iterator<T> {
    next(): T | null;
    hasNext(): boolean;
    current(): T | null;
    reset(): void;
}
```

### 2. Iterable Interface

```typescript
export interface Iterable<T> {
    createIterator(): Iterator<T>;
    createReverseIterator(): Iterator<T>;
}
```

### 3. Concrete Iterator - Forward

```typescript
export class ListIterator<T> implements Iterator<T> {
    private collection: T[];
    private position: number = 0;

    constructor(collection: T[]) {
        this.collection = collection;
    }

    next(): T | null {
        if (this.hasNext()) {
            const element = this.collection[this.position];
            this.position++;
            return element;
        }
        return null;
    }

    hasNext(): boolean {
        return this.position < this.collection.length;
    }

    current(): T | null {
        if (this.position < this.collection.length) {
            return this.collection[this.position];
        }
        return null;
    }

    reset(): void {
        this.position = 0;
    }
}
```

### 4. Concrete Iterator - Reverse

```typescript
export class ReverseListIterator<T> implements Iterator<T> {
    private collection: T[];
    private position: number;

    constructor(collection: T[]) {
        this.collection = collection;
        this.position = collection.length - 1;
    }

    next(): T | null {
        if (this.hasNext()) {
            const element = this.collection[this.position];
            this.position--;
            return element;
        }
        return null;
    }

    hasNext(): boolean {
        return this.position >= 0;
    }

    current(): T | null {
        if (this.position >= 0 && this.position < this.collection.length) {
            return this.collection[this.position];
        }
        return null;
    }

    reset(): void {
        this.position = this.collection.length - 1;
    }
}
```

### 5. Concrete Collection - WordCollection

```typescript
export class WordCollection implements Iterable<string> {
    private words: string[] = [];

    addWord(word: string): void {
        this.words.push(word);
    }

    removeWord(word: string): boolean {
        const index = this.words.indexOf(word);
        if (index > -1) {
            this.words.splice(index, 1);
            return true;
        }
        return false;
    }

    createIterator(): Iterator<string> {
        return new ListIterator<string>(this.words);
    }

    createReverseIterator(): Iterator<string> {
        return new ReverseListIterator<string>(this.words);
    }

    clear(): void {
        this.words = [];
    }
}
```

### 6. Concrete Collection - BookCollection

```typescript
export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    genre: string;
}

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
```

## Usage Example

```typescript
// Word Collection Example
const wordCollection = new WordCollection();
wordCollection.addWord('Design');
wordCollection.addWord('Patterns');
wordCollection.addWord('Are');
wordCollection.addWord('Awesome');

// Forward iteration
console.log('Forward iteration:');
const wordIterator = wordCollection.createIterator();
while (wordIterator.hasNext()) {
    const word = wordIterator.next();
    console.log(`-> ${word}`);
}

// Reverse iteration
console.log('Reverse iteration:');
const reverseWordIterator = wordCollection.createReverseIterator();
while (reverseWordIterator.hasNext()) {
    const word = reverseWordIterator.next();
    console.log(`-> ${word}`);
}

// Book Collection Example
const bookCollection = new BookCollection();
bookCollection.addBook('Clean Code', 'Robert C. Martin', 2008, 'Programming');
bookCollection.addBook('Design Patterns', 'Gang of Four', 1994, 'Programming');
bookCollection.addBook('1984', 'George Orwell', 1949, 'Fiction');

// Iterate through books
const bookIterator = bookCollection.createIterator();
while (bookIterator.hasNext()) {
    const book = bookIterator.next();
    if (book) {
        console.log(`"${book.title}" by ${book.author} (${book.year}) - ${book.genre}`);
    }
}
```

## UML Class Diagram

```
┌─────────────────────┐
│    Iterator<T>      │
│    <<interface>>    │
├─────────────────────┤
│ + next(): T | null  │
│ + hasNext(): boolean│
│ + current(): T|null │
│ + reset(): void     │
└─────────────────────┘
           ▲
           │
    ┌──────┴──────┐
    │             │
┌─────────────────────┐  ┌─────────────────────┐
│   ListIterator<T>   │  │ReverseListIterator<T>│
├─────────────────────┤  ├─────────────────────┤
│ - collection: T[]   │  │ - collection: T[]   │
│ - position: number  │  │ - position: number  │
├─────────────────────┤  ├─────────────────────┤
│ + next(): T | null  │  │ + next(): T | null  │
│ + hasNext(): boolean│  │ + hasNext(): boolean│
│ + current(): T|null │  │ + current(): T|null │
│ + reset(): void     │  │ + reset(): void     │
└─────────────────────┘  └─────────────────────┘

┌─────────────────────┐
│    Iterable<T>      │
│    <<interface>>    │
├─────────────────────┤
│ + createIterator(): │
│   Iterator<T>       │
│ + createReverseIter-│
│   ator(): Iterator<T>│
└─────────────────────┘
           ▲
           │
    ┌──────┴──────┐
    │             │
┌─────────────────────┐  ┌─────────────────────┐
│   WordCollection    │  │   BookCollection    │
├─────────────────────┤  ├─────────────────────┤
│ - words: string[]   │  │ - books: Book[]     │
├─────────────────────┤  │ - nextId: number    │
│ + addWord(word:     │  ├─────────────────────┤
│   string): void     │  │ + addBook(...): Book│
│ + removeWord(word:  │  │ + removeBook(id:    │
│   string): boolean  │  │   number): boolean  │
│ + createIterator(): │  │ + getBooks(): Book[]│
│   Iterator<string>  │  │ + createIterator(): │
│ + createReverseIter-│  │   Iterator<Book>    │
│   ator(): Iterator  │  │ + createReverseIter-│
│   <string>          │  │   ator(): Iterator  │
│ + clear(): void     │  │   <Book>            │
└─────────────────────┘  │ + clear(): void     │
                         └─────────────────────┘
```

## Benefits

1. **Encapsulation**: The internal structure of collections is hidden from clients
2. **Polymorphism**: Different collections can be traversed using the same interface
3. **Multiple Iterators**: You can have multiple iterators traversing the same collection simultaneously
4. **Different Traversal Algorithms**: Easy to implement different ways of traversing (forward, backward, filtered, etc.)
5. **Single Responsibility**: Traversal logic is separated from collection logic

## When to Use

- When you need to traverse a collection without exposing its internal structure
- When you want to support multiple ways of traversing the same collection
- When you need to provide a uniform interface for traversing different types of collections
- When you want to support multiple simultaneous traversals of the same collection

## Real-World Applications

1. **Database Result Sets**: Iterating through query results
2. **File System Traversal**: Walking through directory structures
3. **DOM Tree Traversal**: Navigating HTML/XML elements
4. **Social Media Feeds**: Paginating through posts or comments
5. **Game Development**: Iterating through game objects or inventory items
6. **Data Processing Pipelines**: Sequential processing of data streams

## Related Patterns

- **Composite**: Often used together with Iterator to traverse composite structures
- **Factory Method**: Can be used to create different types of iterators
- **Visitor**: Visitor pattern often uses iterators to traverse object structures
- **Template Method**: Iterator's traversal algorithm can be defined using Template Method

## TypeScript Advantages

- **Generics**: Type-safe iterations with `Iterator<T>` and `Iterable<T>`
- **Interface Segregation**: Clean separation of concerns with interfaces
- **Type Safety**: Compile-time checking ensures correct usage
- **IntelliSense**: Better IDE support with proper typing

## Running the Example

To run the iterator pattern example:

```bash
# Navigate to the iterator directory
cd design-pattern-ts/behavioural/iterator

# Run the main file
npx ts-node iterator-main.ts
```

This will demonstrate both forward and reverse iteration through word and book collections, showcasing the flexibility and power of the Iterator pattern.
