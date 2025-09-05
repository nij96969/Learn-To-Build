import { Iterable } from '../interfaces/iterable';
import { Iterator } from '../interfaces/iterator';
import { ListIterator } from '../iterators/list-iterator';
import { ReverseListIterator } from '../iterators/reverse-list-iterator';

/**
 * Word Collection
 * 
 * A concrete collection that implements the Iterable interface.
 * This collection stores words and provides iterators for traversal.
 * Demonstrates how different collections can implement the same interface.
 */
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
