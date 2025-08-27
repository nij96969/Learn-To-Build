import { IApiHandler } from "../interface/apiHandler";

/**
 * Concrete implementation of the API handler
 * This is the base class that makes the real HTTP calls
 * In a real-world scenario, this would use libraries like axios, fetch, or node-fetch
 */
export class BaseApiHandler implements IApiHandler {
    /**
     * Simulates an API call with a delay
     * @param endpoint The API endpoint to call
     * @param data Optional data to send with the request
     * @returns Promise that resolves to a simulated API response
     */
    async request(endpoint: string, data: any = {}): Promise<any> {
        // Simulate network latency and API processing time
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    endpoint,
                    data,
                    response: "OK from server",
                    timestamp: new Date().toISOString(),
                    status: 200
                });
            }, 300); // 300ms delay to simulate network call
        });
    }
}
