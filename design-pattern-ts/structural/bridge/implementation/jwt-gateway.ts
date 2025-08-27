// implementation/jwt-gateway.ts
import { AuthGateway } from "../interface/auth-gateway";

export class JWTGateway implements AuthGateway {
  async authenticate(token: string): Promise<boolean> {
    console.log(`[JWT] Validating token ${token}...`);
    // Simulate JWT validation
    return token === "valid_token";
  }

  async authorize(userId: string, resource: string): Promise<boolean> {
    console.log(`[JWT] Authorizing ${userId} for ${resource}`);
    return true;
  }
}
