import { PaymentFacade } from "./payment-facade";
import { PaymentProvider } from "./constants/payment-constants";
import { handleError } from "../../utils/handleError";

/**
 * Demonstration of Facade Pattern
 * 
 * The Facade Pattern provides a simplified interface to a complex subsystem.
 * In this example, we're using the existing Adapter pattern implementations
 * and wrapping them in a Facade to provide:
 * 
 * 1. Simplified payment processing with specific providers
 * 2. Unified interface for multiple payment systems
 * 3. Centralized error handling
 * 4. Bulk payment processing
 * 5. Provider availability checking
 */
function facadeMain() {
    try {
        console.log("=== Facade Pattern Demo ===\n");

        // Initialize the facade (this hides all the complexity)
        const paymentFacade = new PaymentFacade();

        console.log('📋 Available Payment Providers:');
        console.log(paymentFacade.getAvailableProviders());
        console.log('\n');

        // Demo 1: Simple payment processing with specific provider
        console.log('🔸 Demo 1: Payment with Specific Provider (Provider is Compulsory)');
        
        // Process payment with RazorPay
        processPayment(paymentFacade, PaymentProvider.RAZOR_PAY, 1000);
        
        console.log("--------------------------------");
        
        // Process payment with Google Pay
        processPayment(paymentFacade, PaymentProvider.GOOGLE_PAY, 2500);
        
        console.log("--------------------------------");

        // Demo 2: Payment with different providers
        console.log('\n🔸 Demo 2: Multiple Payments with Different Providers');
        
        processPayment(paymentFacade, PaymentProvider.BHARAT_PAY, 500);
        processPayment(paymentFacade, PaymentProvider.PAYTM_PAY, 750);
        
        console.log("--------------------------------");

        // Demo 3: Provider availability check
        console.log('\n🔸 Demo 3: Provider Management');
        console.log('   🔍 Checking provider availability:');
        
        Object.values(PaymentProvider).forEach(provider => {
            const available = paymentFacade.isProviderAvailable(provider);
            const status = available ? '✅' : '❌';
            console.log(`   ${status} ${provider}: ${available ? 'Available' : 'Not Available'}`);
        });

        console.log("\n=== Facade Pattern Benefits ===");
        console.log('✅ Simplified Interface: Complex payment system → Simple API');
        console.log('✅ Decoupling: Client code separated from subsystem details');
        console.log('✅ Convenience: One facade for all payment operations');
        console.log('✅ Maintainability: Changes to adapters don\'t affect client');
        console.log('✅ Error Handling: Centralized error management');
        console.log('✅ Provider Control: Client has full control over provider selection');

    } catch (error) {
        throw handleError(error, "facadeMain");
    }
}

/**
 * Helper function to process a single payment
 */
function processPayment(facade: PaymentFacade, provider: PaymentProvider, amount: number) {
    try {
        console.log(`💳 Processing ${amount} INR via ${provider}`);
        
        // In real scenario, this would be async
        facade.processPayment(provider, amount, 'INR');
        
        console.log(`✅ Payment successful with ${provider}`);
    } catch (error) {
        console.error(`❌ Payment failed with ${provider}:`, error);
    }
}

/**
 * Demonstrate what client code would look like without facade
 */
function demonstrateWithoutFacade() {
    console.log('\n🚫 ===============================================');
    console.log('🚫 WITHOUT FACADE - COMPLEX CLIENT CODE');
    console.log('🚫 ===============================================');
    
    console.log('// Client would need to import and manage all these:');
    console.log('import { BharatPayAdapter, RazorPayAdapter, PaytmPayAdapter, GooglePayAdapter } from "../adapter/payment-adapter";');
    console.log('import { BharatPay, GooglePay, PaytmPay, RazorPay } from "../adapter/payment/payment-api";');
    console.log('');
    console.log('// Client would need to initialize each adapter:');
    console.log('const bharatPay = new BharatPay();');
    console.log('const bharatPayAdapter = new BharatPayAdapter(bharatPay);');
    console.log('// ... repeat for all providers');
    console.log('');
    console.log('// Client would need to handle each payment separately:');
    console.log('try {');
    console.log('  bharatPayAdapter.pay(amount);');
    console.log('} catch (error) {');
    console.log('  // Handle error for each provider separately');
    console.log('}');
    console.log('');
    console.log('❌ This becomes complex, error-prone, and hard to maintain!');
    console.log('✅ With Facade: One interface for all payment operations!');
}

// Execute the main function
facadeMain();

// Show comparison
demonstrateWithoutFacade();