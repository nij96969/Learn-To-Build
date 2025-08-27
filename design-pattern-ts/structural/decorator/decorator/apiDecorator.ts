import { IApiHandler } from "../interface/apiHandler";

/**
 * Abstract base decorator class
 * This class implements the common interface and holds a reference to the wrapped object
 * All concrete decorators will extend this class
 */
export abstract class ApiDecorator implements IApiHandler {
    protected wrappee: IApiHandler;

    /**
     * Constructor accepts any object that implements IApiHandler
     * This could be a concrete handler or another decorator
     * @param apiHandler The API handler to decorate
     */
    constructor(apiHandler: IApiHandler) {
        this.wrappee = apiHandler;
    }

    /**
     * Default implementation just forwards the call to the wrapped object
     * Concrete decorators can override this to add their own behavior
     * @param endpoint The API endpoint to call
     * @param data Optional data to send with the request
     * @returns Promise that resolves to the API response
     */
    async request(endpoint: string, data?: any): Promise<any> {
        return this.wrappee.request(endpoint, data);
    }
}
