import { AbstractValidator } from '../abstract-validator';

/**
 * AuthValidator ensures that the user is properly authenticated
 * This is typically the first validator in the chain
 */
export class AuthValidator extends AbstractValidator {
  validate(order: any) {
    if (!order.userId) throw new Error("User not authenticated");
    console.log("✅ Auth validated");
    super.validate(order);
  }
}
