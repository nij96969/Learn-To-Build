import { OrderState } from '../interfaces/order-state';
import { Order } from '../order';
import { PackedState } from './packed-state';
import { handleError } from '../../../utils/handleError';

/**
 * Concrete State: ConfirmedState
 * Represents the state when an order is confirmed
 */
export class ConfirmedState implements OrderState {
  name(): string {
    return "CONFIRMED";
  }

  next(order: Order): void {
    try {
      order.setState(new PackedState());
    } catch (err) {
      throw handleError(err, 'ConfirmedState next');
    }
  }
}
