// abstraction/mobile-app-auth.ts
import { AuthProvider } from "./auth-provider";
import { AuthGateway } from "../interface/auth-gateway";
import { handleError } from "../../../utils/handleError";

export class MobileAppAuth extends AuthProvider {
  constructor(gateway: AuthGateway) {
    super(gateway);
  }

  async login(token: string): Promise<boolean> {
    try {
        console.log("[MobileApp] Authenticating via token...");
        return this.gateway.authenticate(token);
    } catch (error) {
        throw handleError(error, "MobileAppAuth.login");
    }
    
  }

  async checkAccess(userId: string, resource: string): Promise<boolean> {
    try {
        console.log("[MobileApp] Checking access...");
        return this.gateway.authorize(userId, resource);
    } catch (error) {
        throw handleError(error, "MobileAppAuth.checkAccess");
    }
  }
}
