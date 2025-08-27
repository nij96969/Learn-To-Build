import { Validator } from '../interfaces/validator';

/**
 * Abstract base class for all validators in the Chain of Responsibility
 * Implements the common functionality for chaining validators
 */
export abstract class AbstractValidator implements Validator {
  private nextValidator: Validator | null = null;

  /**
   * Sets the next validator in the chain
   * @param validator - The next validator to be executed
   * @returns The validator that was set as next (for method chaining)
   */
  setNext(validator: Validator): Validator {
    this.nextValidator = validator;
    return validator;
  }

  /**
   * Template method that handles the validation flow
   * Calls the next validator if current validation passes
   * @param order - The order request to validate
   */
  validate(order: any): void {
    if (this.nextValidator) {
      this.nextValidator.validate(order);
    }
  }
}
