// abstraction/auth-provider.ts
import { AuthGateway } from "../interface/auth-gateway";

export abstract class AuthProvider {
  protected gateway: AuthGateway;

  constructor(gateway: AuthGateway) {
    this.gateway = gateway;
  }

  abstract login(usernameOrToken: string, password?: string): Promise<boolean>;
  abstract checkAccess(userId: string, resource: string): Promise<boolean>;
}
