import { ProductElement } from '../interfaces/element';
import { DiscountVisitor } from '../visitor/discount-visitor';
import { ShippingVisitor } from '../visitor/shipping-visitor';
import { handleError } from '../../../utils/handleError';

/**
 * Shopping Cart Context Class
 * Manages products and applies visitors to them
 * Acts as the context that coordinates between elements and visitors
 */
export class ShoppingCart {
  private products: ProductElement[] = [];

  /**
   * Add a product to the cart
   * @param product - Product to add to the cart
   */
  addProduct(product: ProductElement): void {
    try {
      if (!product) {
        throw new Error('Product cannot be null or undefined');
      }
      this.products.push(product);
    } catch (error) {
      throw handleError(error, 'ShoppingCart.addProduct');
    }
  }

  /**
   * Remove a product from the cart by index
   * @param index - Index of the product to remove
   */
  removeProduct(index: number): void {
    try {
      if (index < 0 || index >= this.products.length) {
        throw new Error('Invalid product index');
      }
      this.products.splice(index, 1);
    } catch (error) {
      throw handleError(error, 'ShoppingCart.removeProduct');
    }
  }


  getProducts(): ProductElement[] {
    return [...this.products];
  }

  applyVisitor(visitor: DiscountVisitor | ShippingVisitor): void {
    try {
      if (!visitor) {
        throw new Error('Visitor cannot be null or undefined');
      }
      
      this.products.forEach(product => {
        product.accept(visitor);
      });
    } catch (error) {
      throw handleError(error, 'ShoppingCart.applyVisitor');
    }
  }

  /**
   * Get total value of all products
   * @returns total cart value
   */
  getTotalValue(): number {
    try {
      return this.products.reduce((total, product) => total + product.price, 0);
    } catch (error) {
      throw handleError(error, 'ShoppingCart.getTotalValue');
    }
  }
}
