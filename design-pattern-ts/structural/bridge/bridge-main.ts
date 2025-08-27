// bridge-main.ts
import { GoogleOAuthGateway } from "./implementation/google-oauth-gateway";
import { JWTGateway } from "./implementation/jwt-gateway";
import { WebAppAuth } from "./abstraction/web-app-auth";
import { MobileAppAuth } from "./abstraction/mobile-app-auth";

async function main() {
  console.log("🔗 Bridge Pattern - Authentication System Demo\n");


  // Mobile app using Google OAuth
  console.log("=== Mobile App Authentication (Google OAuth) ===");
  const mobileAuth = new MobileAppAuth(new GoogleOAuthGateway());
  await mobileAuth.login("alice@gmail.com");
  await mobileAuth.checkAccess("alice", "settings");

  console.log("\n------\n");

  // Mobile app using JWT
  console.log("=== Mobile App Authentication (JWT) ===");
  const jwtAuth = new MobileAppAuth(new JWTGateway());
  await jwtAuth.login("valid_token");
  await jwtAuth.checkAccess("bob", "profile");

  console.log("\n------\n");

  // Demonstrate flexibility: Web app can also use Google OAuth
  console.log("=== Web App Authentication (Google OAuth) ===");
  const webAuthGoogle = new WebAppAuth(new GoogleOAuthGateway());
  await webAuthGoogle.login("john@company.com");
  await webAuthGoogle.checkAccess("john", "admin-panel");
}

// Execute the demo
main().catch(console.error);
