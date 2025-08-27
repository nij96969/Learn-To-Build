import { ApiDecorator } from "./apiDecorator";
import { IApiHandler } from "../interface/apiHandler";

/**
 * Authentication decorator that validates tokens before API calls
 * Similar to what API Gateways (Kong, Apigee, AWS API Gateway) do for authentication checks
 */
export class AuthDecorator extends ApiDecorator {
    private token: string | null;

    /**
     * Constructor that accepts a token for authentication
     * @param apiHandler The API handler to decorate
     * @param token The authentication token (Bearer token, API key, etc.)
     */
    constructor(apiHandler: IApiHandler, token: string | null) {
        super(apiHandler);
        this.token = token;
    }

    /**
     * Validates authentication before making the API call
     * @param endpoint The API endpoint to call
     * @param data Optional data to send with the request
     * @returns Promise that resolves to the API response
     * @throws Error if no token is provided
     */
    async request(endpoint: string, data?: any): Promise<any> {
        // Check if token is provided
        if (!this.token) {
            console.error(`🔒 [AUTH] Access denied to ${endpoint}: No authentication token provided`);
            throw new Error("Unauthorized: No token provided");
        }

        // Validate token format (basic validation)
        if (!this.isValidToken(this.token)) {
            console.error(`🔒 [AUTH] Access denied to ${endpoint}: Invalid token format`);
            throw new Error("Unauthorized: Invalid token format");
        }

        console.log(`🔐 [AUTH] Token validated for ${endpoint}: ${this.maskToken(this.token)}`);
        
        // Add authorization header to the request data
        const enrichedData = {
            ...data,
            _authHeaders: {
                Authorization: this.token
            }
        };

        return super.request(endpoint, enrichedData);
    }

    /**
     * Basic token validation (in real apps, this would verify with auth service)
     * @param token The token to validate
     * @returns true if token format is valid
     */
    private isValidToken(token: string): boolean {
        // Simple validation: token should have minimum length and contain Bearer or valid format
        return token.length > 10 && (token.startsWith('Bearer ') || token.includes('key_'));
    }

    /**
     * Masks the token for secure logging
     * @param token The token to mask
     * @returns Masked version of the token
     */
    private maskToken(token: string): string {
        if (token.length <= 8) return '***';
        return token.substring(0, 8) + '***' + token.substring(token.length - 4);
    }
}
