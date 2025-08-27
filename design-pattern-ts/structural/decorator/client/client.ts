import { BaseApiHandler } from "../concrete/baseApiHandler";
import { LoggingDecorator } from "../decorator/loggingDecorator";
import { AuthDecorator } from "../decorator/authDecorator";
import { IApiHandler } from "../interface/apiHandler";
import { handleError } from "../../../utils/handleError";

/**
 * Client code demonstrating the power of the Decorator pattern
 * Shows how to compose different behaviors dynamically
 */
export class ApiClient {
    private apiHandler: IApiHandler;

    constructor() {
        // Start with the base API handler
        let api: IApiHandler = new BaseApiHandler();

        // Wrap it with decorators in the desired order
        // Note: Order matters! The outermost decorator runs first
        api = new LoggingDecorator(api);           // Log all requests/responses
        api = new AuthDecorator(api, "Bearer abc123token"); // Add authentication

        this.apiHandler = api;
    }

    /**
     * Example method showing API usage
     */
    async demonstrateApiCalls(): Promise<void> {
        console.log("🎯 === API Decorator Pattern Demo ===\n");

        try {
            // First call - should go through all decorators and hit the server
            console.log("📞 === FIRST CALL (Authenticated request) ===");
            const response1 = await this.apiHandler.request("/users", { id: 1, action: "get" });
            console.log("Response:", response1);
            
            console.log("\n" + "=".repeat(50) + "\n");

            // Second call with different params
            console.log("📞 === SECOND CALL (Different user) ===");
            const response2 = await this.apiHandler.request("/users", { id: 2, action: "get" });
            console.log("Response:", response2);

            console.log("\n" + "=".repeat(50) + "\n");

            // Third call - different endpoint
            console.log("📞 === THIRD CALL (Different endpoint) ===");
            const response3 = await this.apiHandler.request("/posts", { limit: 10 });
            console.log("Response:", response3);

        } catch (error) {
            handleError(error, "ApiClient.demonstrateApiCalls");
        }
    }

    /**
     * Demonstrates what happens with no authentication token
     */
    async demonstrateAuthFailure(): Promise<void> {
        console.log("\n🔒 === AUTHENTICATION FAILURE DEMO ===\n");

        // Create API handler without authentication
        let api: IApiHandler = new BaseApiHandler();
        api = new LoggingDecorator(api);
        api = new AuthDecorator(api, null); // No token provided

        try {
            await api.request("/protected-endpoint", { secret: "data" });
        } catch (error) {
            handleError(error, "ApiClient.demonstrateAuthFailure");
        }
    }

    /**
     * Demonstrates different decorator ordering
     */
    async demonstrateDifferentOrdering(): Promise<void> {
        console.log("\n🔄 === DIFFERENT DECORATOR ORDERING DEMO ===\n");

        // Different order: Auth -> Logging -> Base
        let api: IApiHandler = new BaseApiHandler();
        api = new AuthDecorator(api, "Bearer different_order_token");
        api = new LoggingDecorator(api);

        console.log("Order: Auth -> Logging -> Base");
        const response = await api.request("/ordered-test", { test: "ordering" });
        console.log("Response:", response);
    }
}