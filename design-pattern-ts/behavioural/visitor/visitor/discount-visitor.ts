import { ProductVisitor } from '../interfaces/visitor';
import { Book } from '../elements/book';
import { Electronics } from '../elements/electronics';
import { handleError } from '../../../utils/handleError';
import { ProductElement } from '../interfaces/element';


export class DiscountVisitor implements ProductVisitor {
  private readonly BOOK_DISCOUNT_RATE = 0.1; // 10% discount for books
  private readonly ELECTRONICS_DISCOUNT_RATE = 0.05; // 5% discount for electronics

  /**
   * Visit method for Book elements - calculates book discount
   * @param book - The book element to calculate discount for
   */
  visitBook(book: Book): void {
    try {
      if (!book) {
        throw new Error('Book cannot be null or undefined');
      }
      
      const discount = book.price * this.BOOK_DISCOUNT_RATE;
      const finalPrice = book.price - discount;
      
      console.log(`Book - Original: $${book.price.toFixed(2)}, Discount: $${discount.toFixed(2)} (${(this.BOOK_DISCOUNT_RATE * 100)}%), Final: $${finalPrice.toFixed(2)}`);
    } catch (error) {
      throw handleError(error, 'DiscountVisitor.visitBook');
    }
  }

  /**
   * Visit method for Electronics elements - calculates electronics discount
   * @param electronics - The electronics element to calculate discount for
   */
  visitElectronics(electronics: Electronics): void {
    try {
      if (!electronics) {
        throw new Error('Electronics cannot be null or undefined');
      }
      
      const discount = electronics.price * this.ELECTRONICS_DISCOUNT_RATE;
      const finalPrice = electronics.price - discount;
      
      console.log(`Electronics - Original: $${electronics.price.toFixed(2)}, Discount: $${discount.toFixed(2)} (${(this.ELECTRONICS_DISCOUNT_RATE * 100)}%), Final: $${finalPrice.toFixed(2)}`);
    } catch (error) {
      throw handleError(error, 'DiscountVisitor.visitElectronics');
    }
  }

  /**
   * Get total discount for a collection of products
   * @param products - Array of product elements
   * @returns total discount amount
   */
  calculateTotalDiscount(products: ProductElement[]): number {
    try {
      let totalDiscount = 0;
      
      for (const product of products) {
        if (product instanceof Book) {
          totalDiscount += product.price * this.BOOK_DISCOUNT_RATE;
        } else if (product instanceof Electronics) {
          totalDiscount += product.price * this.ELECTRONICS_DISCOUNT_RATE;
        }
      }
      
      return totalDiscount;
    } catch (error) {
      throw handleError(error, 'DiscountVisitor.calculateTotalDiscount');
    }
  }
}
