import { OrderState } from '../interfaces/order-state';
import { Order } from '../order';
import { ConfirmedState } from './confirmed-state';
import { handleError } from '../../../utils/handleError';

/**
 * Concrete State: PlacedState
 * Represents the initial state when an order is placed
 */
export class PlacedState implements OrderState {
  name(): string {
    return "PLACED";
  }

  next(order: Order): void {
    try {
      order.setState(new ConfirmedState());
    } catch (err) {
      throw handleError(err, 'PlacedState next');
    }
  }
}
