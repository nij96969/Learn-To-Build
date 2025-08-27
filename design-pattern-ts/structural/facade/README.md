# Facade Pattern Implementation

## Overview
This implementation demonstrates the **Facade Pattern** using the existing **Adapter Pattern** for payment processing. The facade provides a simplified interface to multiple payment providers while maintaining strict provider control.

## Key Features

### ✅ Provider is Compulsory
- No automatic provider selection
- Client must specify which payment provider to use
- No fallback mechanism - if a provider fails, the payment fails

### ✅ No Automatic Fallback
- Each payment request must specify its provider
- No automatic switching between providers
- Full control remains with the client

### ✅ Error Handling
- Uses the `handleError` utility function from `utils/handleError.ts`
- Consistent error handling across all methods
- Context-aware error messages

### ✅ Reuses Existing Adapter Pattern
- Leverages existing payment adapters (BharatPay, RazorPay, PaytmPay, GooglePay)
- No code duplication
- Maintains adapter pattern benefits

## Files Structure

```
facade/
├── interfaces/
│   └── payment-facade-interface.ts    # Interface definitions
├── payment-facade.ts                  # Main facade implementation
├── facade-main.ts                     # Demonstration and usage examples
└── README.md                          # This file
```

## Usage Example

```typescript
import { PaymentFacade } from "./payment-facade";
import { PaymentProvider } from "./interfaces/payment-facade-interface";

const paymentFacade = new PaymentFacade();

// Single payment with specific provider
await paymentFacade.processPayment(PaymentProvider.RAZOR_PAY, 1000, 'INR');

// Bulk payments with specific providers
const payments = [
    { amount: 500, provider: PaymentProvider.GOOGLE_PAY, currency: 'INR' },
    { amount: 750, provider: PaymentProvider.BHARAT_PAY, currency: 'INR' }
];
const results = await paymentFacade.processBulkPayments(payments);
```

## Benefits

1. **Simplified Interface**: One facade instead of managing multiple adapters
2. **Decoupling**: Client code separated from payment subsystem complexity
3. **Maintainability**: Changes to adapters don't affect client code
4. **Provider Control**: Full control over which provider to use
5. **Centralized Error Handling**: Consistent error management
6. **Reusability**: Leverages existing adapter pattern implementation

## Run the Demo

```bash
npx ts-node structural/facade/facade-main.ts
```

This will demonstrate all the facade pattern features and show the benefits over direct adapter usage.
