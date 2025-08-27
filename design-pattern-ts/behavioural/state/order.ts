import { OrderState } from './interfaces/order-state';
import { handleError } from '../../utils/handleError';

/**
 * Context class - Order
 * Maintains a reference to a state object and delegates behavior to the current state
 */
export class Order {
  private state: OrderState;

  constructor(initialState: OrderState) {
    try {
      this.state = initialState;
    } catch (err) {
      throw handleError(err, 'Order constructor');
    }
  }

  /**
   * Changes the state of the order
   * @param state - The new state to transition to
   */
  setState(state: OrderState): void {
    try {
      this.state = state;
      console.log(`🔄 Order moved to state: ${state.name()}`);
    } catch (err) {
      throw handleError(err, 'Order setState');
    }
  }

  /**
   * Proceeds to the next state based on current state logic
   */
  proceed(): void {
    try {
      this.state.next(this);
    } catch (err) {
      throw handleError(err, 'Order proceed');
    }
  }

  /**
   * Gets the current state name
   * @returns The current state name
   */
  getState(): string {
    try {
      return this.state.name();
    } catch (err) {
      throw handleError(err, 'Order getState');
    }
  }
}
