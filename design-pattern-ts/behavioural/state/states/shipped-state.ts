import { OrderState } from '../interfaces/order-state';
import { Order } from '../order';
import { DeliveredState } from './delivered-state';
import { handleError } from '../../../utils/handleError';

/**
 * Concrete State: ShippedState
 * Represents the state when an order is shipped
 */
export class ShippedState implements OrderState {
  name(): string {
    return "SHIPPED";
  }

  next(order: Order): void {
    try {
      order.setState(new DeliveredState());
    } catch (err) {
      throw handleError(err, 'ShippedState next');
    }
  }
}
