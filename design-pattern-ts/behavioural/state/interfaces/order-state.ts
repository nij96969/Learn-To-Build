import { Order } from '../order';

/**
 * State Interface for Order Lifecycle
 * Defines the contract that all concrete states must follow
 */
export interface OrderState {
  /**
   * Transitions the order to the next state
   * @param order - The order context
   */
  next(order: Order): void;
  
  /**
   * Returns the name of the current state
   * @returns The state name
   */
  name(): string;
}
