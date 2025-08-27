/**
 * Observer Interface
 * Defines the contract for objects that want to be notified of changes
 */
export interface Observer {
  /**
   * Method called when the subject notifies observers of a change
   * @param data - The data passed from the subject
   */
  update(data: any): void;
}