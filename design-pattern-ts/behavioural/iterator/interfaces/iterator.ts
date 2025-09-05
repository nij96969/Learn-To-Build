export interface Iterator<T> {
    next(): T | null;

    hasNext(): boolean;

    current(): T | null;

    reset(): void;
}
