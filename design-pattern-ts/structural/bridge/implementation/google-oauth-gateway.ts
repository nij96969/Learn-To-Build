// implementation/google-oauth-gateway.ts
import { AuthGateway } from "../interface/auth-gateway";

export class GoogleOAuthGateway implements AuthGateway {
  async authenticate(username: string): Promise<boolean> {
    console.log(`[GoogleOAuth] Authenticating ${username} via Google OAuth...`);
    // Simulate calling Google OAuth API
    return true;
  }

  async authorize(userId: string, resource: string): Promise<boolean> {
    console.log(`[GoogleOAuth] Authorizing ${userId} for ${resource}`);
    return true;
  }
}
