import { AbstractValidator } from '../abstract-validator';

/**
 * FraudValidator detects potentially fraudulent orders
 */
export class FraudValidator extends AbstractValidator {
  validate(order: any) {
    if (order.amount > 100000) throw new Error("Possible fraud detected");
    console.log("✅ Fraud check passed");
    super.validate(order);
  }
}
