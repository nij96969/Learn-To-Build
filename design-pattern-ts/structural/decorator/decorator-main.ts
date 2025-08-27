import { ApiClient } from "./client/client";
import { handleError } from "../../utils/handleError";

/**
 * Main entry point demonstrating the Decorator pattern for API calls
 * This showcases real-world usage similar to what you'd find in:
 * - SDKs (AWS SDK, Google Cloud SDK, etc.)
 * - API Gateways (Kong, Apigee, AWS API Gateway)
 * - Backend services with middleware architecture
 */
async function main(): Promise<void> {
    // Create API client with composed decorators
    const client = new ApiClient();

    try {
        // Demonstrate normal API flow with all decorators
        await client.demonstrateApiCalls();

        // Show authentication failure handling
        await client.demonstrateAuthFailure();

        // Show different decorator ordering effects
        await client.demonstrateDifferentOrdering();

    } catch (error) {
        handleError(error, "main");
    }
}

main()
