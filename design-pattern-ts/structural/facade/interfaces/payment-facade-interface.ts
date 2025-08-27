import { PaymentProvider } from "../constants/payment-constants";
export interface IPaymentFacade {
    /**
     * Process payment using a specific provider (provider is compulsory)
     * @param provider - Payment provider name (required)
     * @param amount - Amount to be paid
     * @param currency - Currency code (default: 'INR')
     * @returns Promise<boolean> - Success status
     */
    processPayment(provider: PaymentProvider, amount: number, currency?: string): Promise<boolean>;

    /**
     * Get available payment providers
     * @returns PaymentProvider[] - List of available providers
     */
    getAvailableProviders(): PaymentProvider[];

    /**
     * Check if a specific provider is available
     * @param provider - Payment provider name
     * @returns boolean - Availability status
     */
    isProviderAvailable(provider: PaymentProvider): boolean;

    /**
     * Process bulk payments with specific providers (no automatic fallback)
     * @param payments - Array of payment requests (each must specify provider)
     * @returns Promise<PaymentResult[]> - Results for each payment
     */
    processBulkPayments(payments: PaymentRequest[]): Promise<PaymentResult[]>;
}       

export interface PaymentRequest {
    amount: number;
    currency: string;
    provider: PaymentProvider; // Made compulsory
    metadata?: Record<string, any>;
}

export interface PaymentResult {
    success: boolean;
    provider: PaymentProvider;
    transaction_id?: string;
    amount: number;
    currency: string;
    error?: string;
    timestamp: Date;
}
