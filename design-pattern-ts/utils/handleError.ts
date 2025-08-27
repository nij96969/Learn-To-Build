// Enhanced error handling with context
export function handleError(err: any, context?: string): Error {
    let error: Error;
    
    if (err instanceof Error) {
        error = err;
    } else {
        error = new Error(String(err));
    }
    
    // Add context to error message if provided
    if (context) {
        error.message = `[${context}] ${error.message}`;
    }
    
    return error;
}