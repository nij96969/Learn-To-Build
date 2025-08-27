// Order validation chain using CoR with handleError utility - Organized Structure
import { handleError } from '../../utils/handleError';

// Import interfaces
import { Validator } from './interfaces/validator';
import { OrderRequest } from './interfaces/order';

// Import abstract validator
import { AbstractValidator } from './validators/abstract-validator';

// Enhanced validators with error handling
class AuthValidatorWithErrorHandling extends AbstractValidator {
  validate(order: any) {
    try {
      if (!order.userId) throw new Error("User not authenticated");
      console.log("✅ Auth validated");
      super.validate(order);
    } catch (error) {
      throw handleError(error, "AuthValidator");
    }
  }
}

class InventoryValidatorWithErrorHandling extends AbstractValidator {
  validate(order: any) {
    try {
      if (!order.items || order.items.length === 0) throw new Error("No items in order");
      console.log("✅ Inventory validated");
      super.validate(order);
    } catch (error) {
      throw handleError(error, "InventoryValidator");
    }
  }
}

class PaymentValidatorWithErrorHandling extends AbstractValidator {
  validate(order: any) {
    try {
      if (!order.payment || order.payment.status !== "valid") {
        throw new Error("Invalid payment");
      }
      console.log("✅ Payment validated");
      super.validate(order);
    } catch (error) {
      throw handleError(error, "PaymentValidator");
    }
  }
}

class FraudValidatorWithErrorHandling extends AbstractValidator {
  validate(order: any) {
    try {
      if (order.amount > 100000) throw new Error("Possible fraud detected");
      console.log("✅ Fraud check passed");
      super.validate(order);
    } catch (error) {
      throw handleError(error, "FraudValidator");
    }
  }
}

// Build validation chain
const authValidator = new AuthValidatorWithErrorHandling();
const inventoryValidator = new InventoryValidatorWithErrorHandling();
const paymentValidator = new PaymentValidatorWithErrorHandling();
const fraudValidator = new FraudValidatorWithErrorHandling();

authValidator.setNext(inventoryValidator)
             .setNext(paymentValidator)
             .setNext(fraudValidator);

// Example order
const order = {
  userId: 123,
  items: [{ id: "P100", qty: 2 }],
  payment: { status: "valid" },
  amount: 5000
};

// Run validation chain
try {
  authValidator.validate(order);
  console.log("🎉 Order request is valid and ready to process");
} catch (err: any) {
  throw handleError(err, "Chain of Responsibility");
}

export { 
  Validator, 
  AbstractValidator, 
  AuthValidatorWithErrorHandling, 
  InventoryValidatorWithErrorHandling, 
  PaymentValidatorWithErrorHandling, 
  FraudValidatorWithErrorHandling,
  OrderRequest
};
