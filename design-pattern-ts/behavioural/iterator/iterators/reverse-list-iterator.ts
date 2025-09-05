import { Iterator } from '../interfaces/iterator';

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
