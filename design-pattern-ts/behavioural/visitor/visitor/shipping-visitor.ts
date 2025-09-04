import { ProductVisitor } from '../interfaces/visitor';
import { Book } from '../elements/book';
import { Electronics } from '../elements/electronics';
import { handleError } from '../../../utils/handleError';
import { ProductElement } from '../interfaces/element';

/**
 * Concrete Visitor: Shipping Cost Estimator
 * Calculates shipping costs for different types of products
 */
export class ShippingVisitor implements ProductVisitor {
  private readonly BOOK_SHIPPING_COST = 5; // $5 shipping for books
  private readonly ELECTRONICS_SHIPPING_COST = 20; // $20 shipping for electronics

  /**
   * Visit method for Book elements - calculates book shipping cost
   * @param book - The book element to calculate shipping for
   */
  visitBook(book: Book): void {
    try {
      if (!book) {
        throw new Error('Book cannot be null or undefined');
      }
      
      console.log(`Book (Price: $${book.price.toFixed(2)}) - Shipping Cost: $${this.BOOK_SHIPPING_COST}`);
    } catch (error) {
      throw handleError(error, 'ShippingVisitor.visitBook');
    }
  }

  /**
   * Visit method for Electronics elements - calculates electronics shipping cost
   * @param electronics - The electronics element to calculate shipping for
   */
  visitElectronics(electronics: Electronics): void {
    try {
      if (!electronics) {
        throw new Error('Electronics cannot be null or undefined');
      }
      
      console.log(`Electronics (Price: $${electronics.price.toFixed(2)}) - Shipping Cost: $${this.ELECTRONICS_SHIPPING_COST}`);
    } catch (error) {
      throw handleError(error, 'ShippingVisitor.visitElectronics');
    }
  }

  /**
   * Calculate total shipping cost for a collection of products
   * @param products - Array of product elements
   * @returns total shipping cost
   */
  calculateTotalShipping(products: ProductElement[]): number {
    try {
      let totalShipping = 0;
      
      for (const product of products) {
        if (product instanceof Book) {
          totalShipping += this.BOOK_SHIPPING_COST;
        } else if (product instanceof Electronics) {
          totalShipping += this.ELECTRONICS_SHIPPING_COST;
        }
      }
      
      return totalShipping;
    } catch (error) {
      throw handleError(error, 'ShippingVisitor.calculateTotalShipping');
    }
  }

  /**
   * Check if free shipping is applicable (for orders over $100)
   * @param products - Array of product elements
   * @returns boolean indicating if free shipping applies
   */
  isFreeShippingEligible(products: ProductElement[]): boolean {
    try {
      const totalValue = products.reduce((sum, product) => sum + product.price, 0);
      return totalValue >= 100;
    } catch (error) {
      throw handleError(error, 'ShippingVisitor.isFreeShippingEligible');
    }
  }
}
