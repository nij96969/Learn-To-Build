// abstraction/web-app-auth.ts
import { AuthProvider } from "./auth-provider";
import { AuthGateway } from "../interface/auth-gateway";
import { handleError } from "../../../utils/handleError";

export class WebAppAuth extends AuthProvider {
  constructor(gateway: AuthGateway) {
    super(gateway);
  }

  async login(username: string, password?: string): Promise<boolean> {
    try {
        console.log("[WebApp] Logging in user...");
        return this.gateway.authenticate(username, password);
    } catch (error) {
        throw handleError(error, "WebAppAuth.login");
    }
  }

  async checkAccess(userId: string, resource: string): Promise<boolean> {
    try {
        console.log("[WebApp] Checking access...");
        return this.gateway.authorize(userId, resource);
    } catch (error) {
        throw handleError(error, "WebAppAuth.checkAccess");
    }
  }
}
