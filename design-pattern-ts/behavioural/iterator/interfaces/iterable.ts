import { Iterator } from './iterator';

export interface Iterable<T> {
    createIterator(): Iterator<T>;

    createReverseIterator(): Iterator<T>;
}
