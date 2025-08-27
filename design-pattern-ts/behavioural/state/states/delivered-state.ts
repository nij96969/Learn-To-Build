import { OrderState } from '../interfaces/order-state';
import { Order } from '../order';
import { handleError } from '../../../utils/handleError';

/**
 * Concrete State: DeliveredState
 * Represents the final state when an order is delivered
 */
export class DeliveredState implements OrderState {
  name(): string {
    return "DELIVERED";
  }

  next(order: Order): void {
    try {
      console.log("✅ Order is already delivered. No further transition.");
    } catch (err) {
      throw handleError(err, 'DeliveredState next');
    }
  }
}
