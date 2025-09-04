import { ProductElement } from '../interfaces/element';
import { ProductVisitor } from '../interfaces/visitor';
import { handleError } from '../../../utils/handleError';

/**
 * Concrete Element: Electronics
 * Implements the ProductElement interface and defines accept method
 */
export class Electronics implements ProductElement {
  constructor(public readonly price: number) {
    try {
      if (price < 0) {
        throw new Error('Electronics price cannot be negative');
      }
    } catch (error) {
      throw handleError(error, 'Electronics Constructor');
    }
  }

  /**
   * Accept method that allows visitor to visit this electronics item
   * @param visitor - The visitor that will visit this electronics item
   */
  accept(visitor: ProductVisitor): void {
    try {
      if (!visitor) {
        throw new Error('Visitor cannot be null or undefined');
      }
      visitor.visitElectronics(this);
    } catch (error) {
      throw handleError(error, 'Electronics.accept');
    }
  }

  /**
   * Get electronics type for identification
   * @returns string representing the type of product
   */
  getType(): string {
    return 'Electronics';
  }
}
