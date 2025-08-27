import { Observer } from './observer';

/**
 * Subject Interface (Observable)
 * Defines the contract for objects that can be observed
 */
export interface Subject {
  /**
   * Add an observer to the list of observers
   * @param observer - The observer to add
   */
  subscribe(observer: Observer): void;

  /**
   * Remove an observer from the list of observers
   * @param observer - The observer to remove
   */
  unsubscribe(observer: Observer): void;

  /**
   * Notify all observers about a change
   * @param data - The data to send to observers
   */
  notify(data: any): void;
}