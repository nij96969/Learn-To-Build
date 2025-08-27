/**
 * Common interface for all API call handlers
 * This ensures that all concrete handlers and decorators follow the same contract
 */
export interface IApiHandler {
    /**
     * Makes an API request to the specified endpoint
     * @param endpoint The API endpoint to call
     * @param data Optional data to send with the request
     * @returns Promise that resolves to the API response
     */
    request(endpoint: string, data?: any): Promise<any>;
}
