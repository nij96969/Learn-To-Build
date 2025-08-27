import { ApiDecorator } from "./apiDecorator";
import { handleError } from "../../../utils/handleError";

/**
 * Logging decorator that logs API requests and responses
 * This is commonly used in production systems for monitoring and debugging
 * Similar to what Winston, Datadog, or NewRelic does for API logging
 */
export class LoggingDecorator extends ApiDecorator {
    /**
     * Logs the request, executes it, and logs the response
     * @param endpoint The API endpoint to call
     * @param data Optional data to send with the request
     * @returns Promise that resolves to the API response
     */
    async request(endpoint: string, data?: any): Promise<any> {
        const startTime = Date.now();
        
        console.log(`🚀 [LOG] Starting API call to: ${endpoint}`);
        console.log(`📋 [LOG] Request data:`, data || 'No data');
        
        try {
            const result = await super.request(endpoint, data);
            const duration = Date.now() - startTime;
            
            console.log(`✅ [LOG] Success response from ${endpoint} (${duration}ms):`, result);
            return result;
        } catch (error) {
            const duration = Date.now() - startTime;
            
            throw handleError(error, `LoggingDecorator.${endpoint} (${duration}ms)`);
        }
    }
}
