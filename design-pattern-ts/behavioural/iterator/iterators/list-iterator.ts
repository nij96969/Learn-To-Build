import { Iterator } from '../interfaces/iterator';

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
