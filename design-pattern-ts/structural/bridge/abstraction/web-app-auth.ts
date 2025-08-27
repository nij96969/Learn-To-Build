// abstraction/web-app-auth.ts
import { AuthProvider } from "./auth-provider";
import { AuthGateway } from "../interface/auth-gateway";

export class WebAppAuth extends AuthProvider {
  constructor(gateway: AuthGateway) {
    super(gateway);
  }

  async login(username: string, password?: string): Promise<boolean> {
    console.log("[WebApp] Logging in user...");
    return this.gateway.authenticate(username, password);
  }

  async checkAccess(userId: string, resource: string): Promise<boolean> {
    console.log("[WebApp] Checking access...");
    return this.gateway.authorize(userId, resource);
  }
}
