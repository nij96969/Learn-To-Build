import { Book } from '../elements/book';
import { Electronics } from '../elements/electronics';

/**
 * Visitor Interface
 * Declares visit methods for each type of concrete element
 */
export interface ProductVisitor {
  /**
   * Visit method for Book elements
   * @param book - The book element to visit
   */
  visitBook(book: Book): void;

  /**
   * Visit method for Electronics elements
   * @param electronics - The electronics element to visit
   */
  visitElectronics(electronics: Electronics): void;
}
