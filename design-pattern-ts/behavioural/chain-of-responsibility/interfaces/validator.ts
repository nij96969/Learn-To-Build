/**
 * Base interface for all validators in the Chain of Responsibility
 */
export interface Validator {
  /**
   * Sets the next validator in the chain
   * @param validator - The next validator to be executed
   * @returns The validator that was set as next (for method chaining)
   */
  setNext(validator: Validator): Validator;
  
  /**
   * Validates the order and passes it to the next validator if validation succeeds
   * @param order - The order request to validate
   * @throws Error if validation fails
   */
  validate(order: any): void;
}
