import { ProductElement } from '../interfaces/element';
import { ProductVisitor } from '../interfaces/visitor';
import { handleError } from '../../../utils/handleError';

/**
 * Concrete Element: Book
 * Implements the ProductElement interface and defines accept method
 */
export class Book implements ProductElement {
  constructor(public readonly price: number) {
    try {
      if (price < 0) {
        throw new Error('Book price cannot be negative');
      }
    } catch (error) {
      throw handleError(error, 'Book Constructor');
    }
  }

  /**
   * Accept method that allows visitor to visit this book
   * @param visitor - The visitor that will visit this book
   */
  accept(visitor: ProductVisitor): void {
    try {
      if (!visitor) {
        throw new Error('Visitor cannot be null or undefined');
      }
      visitor.visitBook(this);
    } catch (error) {
      throw handleError(error, 'Book.accept');
    }
  }

  getType(): string {
    return 'Book';
  }
}
