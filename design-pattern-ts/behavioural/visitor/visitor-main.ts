import { Book } from './elements/book';
import { Electronics } from './elements/electronics';
import { DiscountVisitor } from './visitor/discount-visitor';
import { ShippingVisitor } from './visitor/shipping-visitor';
import { ShoppingCart } from './context/shopping-cart';
import { handleError } from '../../utils/handleError';
import { ProductElement } from './interfaces/element';

/**
 * Demonstration function for the Visitor pattern
 */
function demonstrateVisitorPattern(): void {
  try {
    console.log('Visitor Pattern Demo: E-commerce Shopping Cart\n');

    // Create shopping cart and add products
    const cart = new ShoppingCart();
    
    console.log('Adding products to cart...');
    cart.addProduct(new Book(100));
    cart.addProduct(new Electronics(1000));
    cart.addProduct(new Book(200));
    cart.addProduct(new Electronics(500));
    
    const products: ProductElement[] = cart.getProducts();
    console.log(`Cart contains ${products.length} items`);
    console.log(`Total cart value: $${cart.getTotalValue().toFixed(2)}\n`);

    // Apply discount visitor
    console.log('Calculating Discounts');
    const discountVisitor = new DiscountVisitor();
    cart.applyVisitor(discountVisitor);
    
    const totalDiscount = discountVisitor.calculateTotalDiscount(products);
    const finalTotal = cart.getTotalValue() - totalDiscount;
    console.log(`Total discount: $${totalDiscount.toFixed(2)}`);
    console.log(`Final total after discount: $${finalTotal.toFixed(2)}\n`);

    // Apply shipping visitor
    console.log('Calculating Shipping Costs');
    const shippingVisitor = new ShippingVisitor();
    cart.applyVisitor(shippingVisitor);
    
    const totalShipping = shippingVisitor.calculateTotalShipping(products);
    const isFreeShipping = shippingVisitor.isFreeShippingEligible(products);
    
    console.log(`Total shipping cost: $${totalShipping.toFixed(2)}`);
    console.log(`Free shipping eligible: ${isFreeShipping ? 'Yes' : 'No'}`);
    
    if (isFreeShipping) {
      console.log(`Congratulations! You qualify for free shipping (order over $100)`);
    }

    // Final summary
    console.log('\nOrder Summary');
    console.log(`Items: ${products.length}`);
    console.log(`Subtotal: $${cart.getTotalValue().toFixed(2)}`);
    console.log(`Discount: -$${totalDiscount.toFixed(2)}`);
    console.log(`Shipping: ${isFreeShipping ? 'FREE' : '$' + totalShipping.toFixed(2)}`);
    console.log(`Grand Total: $${(finalTotal + (isFreeShipping ? 0 : totalShipping)).toFixed(2)}`);

  } catch (error) {
    const handledError = handleError(error, 'demonstrateVisitorPattern');
    console.error('Error during demonstration:', handledError.message);
  }
}

// Run the demonstrations
demonstrateVisitorPattern();
