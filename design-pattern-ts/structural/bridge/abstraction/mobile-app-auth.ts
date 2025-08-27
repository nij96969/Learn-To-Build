// abstraction/mobile-app-auth.ts
import { AuthProvider } from "./auth-provider";
import { AuthGateway } from "../interface/auth-gateway";

export class MobileAppAuth extends AuthProvider {
  constructor(gateway: AuthGateway) {
    super(gateway);
  }

  async login(token: string): Promise<boolean> {
    console.log("[MobileApp] Authenticating via token...");
    return this.gateway.authenticate(token);
  }

  async checkAccess(userId: string, resource: string): Promise<boolean> {
    console.log("[MobileApp] Checking access...");
    return this.gateway.authorize(userId, resource);
  }
}
