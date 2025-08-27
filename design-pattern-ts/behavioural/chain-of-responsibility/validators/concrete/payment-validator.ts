import { AbstractValidator } from '../abstract-validator';

/**
 * PaymentValidator ensures payment information is valid and sufficient
 */
export class PaymentValidator extends AbstractValidator {
  validate(order: any) {
    if (!order.payment || order.payment.status !== "valid") {
      throw new Error("Invalid payment");
    }
    console.log("✅ Payment validated");
    super.validate(order);
  }
}
