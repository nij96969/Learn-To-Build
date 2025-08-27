# Chain of Responsibility Pattern - Order Validation

## 🔹 Overview

The **Chain of Responsibility (CoR)** pattern allows you to pass requests along a chain of handlers. Each handler decides either to process the request or pass it to the next handler in the chain.

**Perfect use case**: **Validating an order request** before it enters your system. Instead of one giant function with dozens of `if/else` checks, you build a **validation pipeline**. Each validator checks one rule, and if it passes, it forwards the request to the next validator. If it fails, the chain stops and returns an error.

## 🔹 Problem Statement

When processing orders, we need to validate:
1. **Authentication** → user must be logged in
2. **Inventory** → items must be in stock  
3. **Payment** → payment info must be valid
4. **Fraud Detection** → order shouldn't look suspicious

Without CoR, this becomes a massive function with nested if/else statements that's hard to maintain and extend.

## 🔹 Solution Structure

```
chain-of-responsibility/
├── interfaces/
│   ├── validator.ts                    # Base validator interface
│   └── order.ts                       # Order and validation structures
├── validators/
│   ├── abstract-validator.ts          # Base validator implementation
│   └── concrete/                      # Concrete validator implementations
│       ├── auth-validator.ts          # Authentication validation
│       ├── inventory-validator.ts     # Stock availability validation
│       ├── payment-validator.ts       # Payment information validation
│       └── fraud-validator.ts         # Fraud detection validation
├── chain-of-responsibility-main.ts    # Main implementation with organized structure
├── chain-of-responsibility-with-error-handling.ts # Enhanced with handleError utility
├── order-validation-chain.ts          # Basic implementation (original code)
├── order-validation-with-error-handling.ts # Original enhanced version
└── README.md                          # This documentation
```

## 🔹 Implementation

### Basic Implementation (Your Provided Code)

```typescript
// Order validation chain using CoR

interface Validator {
  setNext(validator: Validator): Validator;
  validate(order: any): void;
}

abstract class AbstractValidator implements Validator {
  private nextValidator: Validator | null = null;

  setNext(validator: Validator): Validator {
    this.nextValidator = validator;
    return validator;
  }

  validate(order: any): void {
    if (this.nextValidator) {
      this.nextValidator.validate(order);
    }
  }
}

// Concrete validators
class AuthValidator extends AbstractValidator {
  validate(order: any) {
    if (!order.userId) throw new Error("User not authenticated");
    console.log("✅ Auth validated");
    super.validate(order);
  }
}

class InventoryValidator extends AbstractValidator {
  validate(order: any) {
    if (!order.items || order.items.length === 0) throw new Error("No items in order");
    console.log("✅ Inventory validated");
    super.validate(order);
  }
}

class PaymentValidator extends AbstractValidator {
  validate(order: any) {
    if (!order.payment || order.payment.status !== "valid") {
      throw new Error("Invalid payment");
    }
    console.log("✅ Payment validated");
    super.validate(order);
  }
}

class FraudValidator extends AbstractValidator {
  validate(order: any) {
    if (order.amount > 100000) throw new Error("Possible fraud detected");
    console.log("✅ Fraud check passed");
    super.validate(order);
  }
}

// Build validation chain
const authValidator = new AuthValidator();
const inventoryValidator = new InventoryValidator();
const paymentValidator = new PaymentValidator();
const fraudValidator = new FraudValidator();

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
  console.error("❌ Validation failed:", err.message);
}
```

## 🔹 Usage Examples

### Running the Implementation

```bash
# Navigate to the chain-of-responsibility directory
cd design-pattern-ts/behavioural/chain-of-responsibility

# Run the organized structure implementation
npx ts-node chain-of-responsibility-main.ts

# Run the enhanced version with error handling
npx ts-node chain-of-responsibility-with-error-handling.ts

# Run the original basic implementation
npx ts-node order-validation-chain.ts
```

### Expected Output (Success Case)

```
✅ Auth validated
✅ Inventory validated
✅ Payment validated
✅ Fraud check passed
🎉 Order request is valid and ready to process
```

### Expected Output (Failure Case)

```typescript
// Example with invalid order
const invalidOrder = {
  userId: null, // This will fail authentication
  items: [{ id: "P100", qty: 2 }],
  payment: { status: "valid" },
  amount: 5000
};

// Output:
// ❌ Validation failed: User not authenticated
```

## 🔹 Key Features

### ✅ **Easy to Extend**
```typescript
// Add new validator without modifying existing code
class ShippingValidator extends AbstractValidator {
  validate(order: any) {
    if (!order.shipping) throw new Error("Shipping info required");
    console.log("✅ Shipping validated");
    super.validate(order);
  }
}

// Insert into chain
authValidator.setNext(inventoryValidator)
             .setNext(paymentValidator)
             .setNext(new ShippingValidator()) // New validator
             .setNext(fraudValidator);
```

### ✅ **Flexible Ordering**
```typescript
// Different validation order for different scenarios
// Premium customers might skip fraud checks
authValidator.setNext(inventoryValidator)
             .setNext(paymentValidator);
             // Skip fraud validator for premium users
```

### ✅ **Individual Validator Testing**
```typescript
// Test individual validators
const authValidator = new AuthValidator();
try {
  authValidator.validate({ userId: 123 });
  console.log("Auth test passed");
} catch (error) {
  console.log("Auth test failed:", error.message);
}
```

## 🔹 Industry Use Cases

### **E-commerce Platforms**
- **Amazon/Flipkart**: Order validation through authentication → inventory → payment → fraud → shipping eligibility
- **Shopify**: Product validation → customer verification → payment processing → tax calculation

### **Food Delivery**
- **Uber Eats/Swiggy**: Restaurant availability → menu item availability → delivery area check → payment validation → driver assignment

### **Financial Services**
- **Banks**: Loan applications through KYC → credit score → income verification → fraud detection → approval workflow
- **Payment Processors**: Transaction validation through merchant verification → card validation → risk assessment → processing

### **Booking Systems**
- **Hotels/Airlines**: Availability check → customer verification → payment validation → confirmation → notification

## 🔹 Benefits

1. **🔧 Modularity**: Each validator is independent and focused on one responsibility
2. **📈 Scalability**: Easy to add/remove validators without affecting others
3. **🔄 Reusability**: Validators can be reused in different chains
4. **🧪 Testability**: Each validator can be tested independently
5. **⚡ Performance**: Chain stops at first failure (fail-fast)
6. **🛠️ Maintainability**: Clear separation of concerns

## 🔹 When to Use Chain of Responsibility

### ✅ **Perfect For:**
- Multi-step validation processes
- Request processing pipelines
- Event handling systems
- Middleware implementations
- Approval workflows
- Data processing pipelines

### ❌ **Avoid When:**
- Simple single-step validation
- Performance is critical (small overhead from chaining)
- Chain structure changes frequently
- Complex branching logic is needed

## 🔹 Advanced Features

The enhanced implementation in this project includes:

- **Type Safety**: Strong TypeScript interfaces
- **Error Handling**: Integration with project's `handleError` utility
- **Logging**: Comprehensive validation logging
- **Context**: Validation context for debugging
- **Extensibility**: Easy to add new validators

## 🔹 Related Patterns

- **Template Method**: Used in AbstractValidator for validation flow
- **Strategy Pattern**: Different validation strategies
- **Decorator Pattern**: Can wrap validators with additional behavior
- **Command Pattern**: Each validator as a command

## 🔹 Testing

```typescript
// Example test structure
describe('Order Validation Chain', () => {
  it('should pass valid order through all validators', () => {
    const validOrder = { /* valid order data */ };
    expect(() => authValidator.validate(validOrder)).not.toThrow();
  });

  it('should fail on invalid authentication', () => {
    const invalidOrder = { userId: null };
    expect(() => authValidator.validate(invalidOrder))
      .toThrow('User not authenticated');
  });
});
```

---

**💡 Pro Tip**: Start with basic validation and gradually add more sophisticated checks. The Chain of Responsibility pattern makes this evolutionary approach natural and maintainable.
