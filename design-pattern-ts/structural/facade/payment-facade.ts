import { IPaymentFacade, PaymentRequest, PaymentResult } from "./interfaces/payment-facade-interface";
import { PaymentProvider } from "./constants/payment-constants";

// Import existing adapter pattern classes
import { BharatPayAdapter, RazorPayAdapter, PaytmPayAdapter, GooglePayAdapter } from "../adapter/payment-adapter";
import { IPaymentAdapter } from "../adapter/interfaces/paymet-adapter";
import { BharatPay, GooglePay, PaytmPay, RazorPay } from "../adapter/payment/payment-api";

// Import error handling utility
import { handleError } from "../../utils/handleError";

/**
 * PaymentFacade - Provides a simplified interface for payment processing
 * Uses the existing adapter pattern implementations internally
 * Provider is compulsory - no automatic fallback or provider switching
 */
export class PaymentFacade implements IPaymentFacade {
    private adapters: Map<PaymentProvider, IPaymentAdapter>;

    constructor() {
        this.adapters = new Map();
        this.initializeAdapters();
    }

    /**
     * Initialize all payment adapters using the existing adapter pattern
     */
    private initializeAdapters(): void {
        try {
            // Initialize BharatPay adapter
            const bharatPay = new BharatPay();
            const bharatPayAdapter = new BharatPayAdapter(bharatPay);
            this.adapters.set(PaymentProvider.BHARAT_PAY, bharatPayAdapter);

            // Initialize RazorPay adapter
            const razorPay = new RazorPay();
            const razorPayAdapter = new RazorPayAdapter(razorPay);
            this.adapters.set(PaymentProvider.RAZOR_PAY, razorPayAdapter);

            // Initialize PaytmPay adapter
            const paytmPay = new PaytmPay();
            const paytmPayAdapter = new PaytmPayAdapter(paytmPay);
            this.adapters.set(PaymentProvider.PAYTM_PAY, paytmPayAdapter);

            // Initialize GooglePay adapter
            const googlePay = new GooglePay();
            const googlePayAdapter = new GooglePayAdapter(googlePay);
            this.adapters.set(PaymentProvider.GOOGLE_PAY, googlePayAdapter);

            console.log('✅ Payment Facade: All adapters initialized successfully');
        } catch (error) {
            throw handleError(error, "PaymentFacade.initializeAdapters");
        }
    }

    /**
     * Process payment using the specified provider (provider is compulsory)
     * No automatic fallback - if provider fails, the payment fails
     */
    async processPayment(provider: PaymentProvider, amount: number, currency: string): Promise<boolean> {
        try {
            console.log(`🚀 Payment Facade: Processing payment of ${amount} ${currency} with ${provider}`);

            if (!this.isProviderAvailable(provider)) {
                throw handleError(new Error(`Provider ${provider} is not available`), `PaymentFacade.processPayment[${provider}]`);
            }

            const adapter = this.adapters.get(provider);
            if (!adapter) {
                throw handleError(new Error(`Adapter for ${provider} is not available`), `PaymentFacade.processPayment[${provider}]`);
            }
            
            adapter.pay(amount, currency);
            
            console.log(`✅ Payment Facade: Payment successful with ${provider}`);
            return true;
        } catch (error) {
            throw handleError(error, `PaymentFacade.processPayment[${provider}]`);
        }
    }

    /**
     * Get list of available payment providers
     */
    getAvailableProviders(): PaymentProvider[] {
        try {
            return Array.from(this.adapters.keys());
        } catch (error) {
            throw handleError(error, "PaymentFacade.getAvailableProviders");
        }
    }

    /**
     * Check if a specific provider is available
     */
    isProviderAvailable(provider: PaymentProvider): boolean {
        try {
            return this.adapters.has(provider);
        } catch (error) {
            throw handleError(error, `PaymentFacade.isProviderAvailable[${provider}]`);
        }
    }

    /**
     * Process multiple payments with their specified providers
     * Each payment must specify its provider - no automatic provider assignment
     */
    async processBulkPayments(payments: PaymentRequest[]): Promise<PaymentResult[]> {
        try {
            console.log(`📦 Payment Facade: Processing ${payments.length} bulk payments`);

            const results: PaymentResult[] = [];
            
            // Process payments sequentially to maintain order and handle errors properly
            for (const payment of payments) {
                const startTime = new Date();

                try {
                    const success = await this.processPayment(
                        payment.provider, 
                        payment.amount, 
                        payment.currency
                    );

                    results.push({
                        success,
                        provider: payment.provider,
                        amount: payment.amount,
                        currency: payment.currency,
                        timestamp: startTime
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    
                    results.push({
                        success: false,
                        provider: payment.provider,
                        amount: payment.amount,
                        currency: payment.currency,
                        error: errorMessage,
                        timestamp: startTime
                    });
                }
            }

            const successCount = results.filter(r => r.success).length;
            console.log(`📊 Payment Facade: Bulk payments completed. Success rate: ${successCount}/${results.length}`);
            
            return results;
        } catch (error) {
            throw handleError(error, "PaymentFacade.processBulkPayments");
        }
    }
}