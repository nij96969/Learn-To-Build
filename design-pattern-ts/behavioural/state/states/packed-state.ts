import { OrderState } from '../interfaces/order-state';
import { Order } from '../order';
import { ShippedState } from './shipped-state';
import { handleError } from '../../../utils/handleError';

/**
 * Concrete State: PackedState
 * Represents the state when an order is packed
 */
export class PackedState implements OrderState {
  name(): string {
    return "PACKED";
  }

  next(order: Order): void {
    try {
      order.setState(new ShippedState());
    } catch (err) {
      throw handleError(err, 'PackedState next');
    }
  }
}
