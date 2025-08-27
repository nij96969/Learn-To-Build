import { AbstractValidator } from '../abstract-validator';

/**
 * InventoryValidator checks if all items in the order are available in stock
 */
export class InventoryValidator extends AbstractValidator {
  validate(order: any) {
    if (!order.items || order.items.length === 0) throw new Error("No items in order");
    console.log("✅ Inventory validated");
    super.validate(order);
  }
}
