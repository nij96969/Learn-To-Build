# Bridge Pattern - Authentication System

The **Bridge Pattern** is a structural design pattern that separates abstraction from implementation, allowing both to vary independently. This example demonstrates a real-world authentication system where different authentication methods can be used with different application types.

## 🎯 Problem Solved

In authentication systems, you often need to:
- Support multiple authentication methods (OAuth, LDAP, JWT, etc.)
- Support multiple application types (Web App, Mobile App, API Gateway, etc.)
- Allow easy addition of new auth methods or app types
- Avoid class explosion (N apps × M auth methods = N × M classes)

## 🔗 Bridge Pattern Structure

```
┌─────────────────┐    uses    ┌──────────────────┐
│   Abstraction   │ ---------> │  Implementation  │
│  (AuthProvider) │            │  (AuthGateway)   │
└─────────────────┘            └──────────────────┘
         △                              △
         │                              │
    ┌────┴────┐                    ┌────┴────┐
    │         │                    │         │
┌───▽───┐ ┌──▽───┐            ┌────▽────┐ ┌──▽────┐
│WebApp │ │Mobile│            │GoogleOAuth│ │LDAP  │
│Auth   │ │Auth  │            │Gateway  │ │Gateway│
└───────┘ └──────┘            └─────────┘ └───────┘
```

## 📁 Project Structure

```
bridge/
├── abstraction/
│   ├── auth-provider.ts        # Abstract AuthProvider base class
│   ├── web-app-auth.ts        # Web application authentication
│   └── mobile-app-auth.ts     # Mobile application authentication
├── implementation/
│   ├── auth-gateway.ts        # AuthGateway interface
│   ├── google-oauth-gateway.ts # Google OAuth implementation
│   ├── ldap-gateway.ts        # LDAP authentication implementation
│   └── jwt-gateway.ts         # JWT token implementation
├── bridge-main.ts             # Demo client code
└── README.md                  # This file
```

## 🚀 Usage

### Running the Demo

```bash
# From the bridge directory
npx ts-node bridge-main.ts
```

### Expected Output

```
🔗 Bridge Pattern - Authentication System Demo

=== Web App Authentication (LDAP) ===
[WebApp] Logging in user...
[LDAP] Authenticating alice with LDAP credentials...
[WebApp] Checking access...
[LDAP] Checking LDAP groups for alice on dashboard

------

=== Mobile App Authentication (Google OAuth) ===
[MobileApp] Authenticating via token...
[GoogleOAuth] Authenticating alice@gmail.com via Google OAuth...
[MobileApp] Checking access...
[GoogleOAuth] Authorizing alice for settings

------

=== Mobile App Authentication (JWT) ===
[MobileApp] Authenticating via token...
[JWT] Validating token valid_token...
[MobileApp] Checking access...
[JWT] Authorizing bob for profile

------

=== Web App Authentication (Google OAuth) ===
[WebApp] Logging in user...
[GoogleOAuth] Authenticating john@company.com via Google OAuth...
[WebApp] Checking access...
[GoogleOAuth] Authorizing john for admin-panel

✅ Bridge Pattern Demo Complete!

💡 Key Benefits:
   • Abstraction and Implementation can vary independently
   • Easy to add new authentication methods (Azure AD, GitHub, etc.)
   • Easy to add new application types (API Gateway, Desktop App, etc.)
   • No class explosion (N abstractions × M implementations = N + M classes)
```

## 🏗️ How to Extend

### Adding a New Authentication Method (e.g., Azure AD)

1. Create a new implementation:

```typescript
// implementation/azure-ad-gateway.ts
import { AuthGateway } from "./auth-gateway";

export class AzureADGateway implements AuthGateway {
  async authenticate(username: string, password?: string): Promise<boolean> {
    console.log(`[AzureAD] Authenticating ${username} via Azure AD...`);
    // Azure AD authentication logic
    return true;
  }

  async authorize(userId: string, resource: string): Promise<boolean> {
    console.log(`[AzureAD] Checking Azure AD roles for ${userId} on ${resource}`);
    return true;
  }
}
```

2. Use it with any existing abstraction:

```typescript
const webAuth = new WebAppAuth(new AzureADGateway());
const mobileAuth = new MobileAppAuth(new AzureADGateway());
```

### Adding a New Application Type (e.g., API Gateway)

1. Create a new abstraction:

```typescript
// abstraction/api-gateway-auth.ts
import { AuthProvider } from "./auth-provider";
import { AuthGateway } from "../implementation/auth-gateway";

export class APIGatewayAuth extends AuthProvider {
  constructor(gateway: AuthGateway) {
    super(gateway);
  }

  async login(apiKey: string): Promise<boolean> {
    console.log("[APIGateway] Validating API key...");
    return this.gateway.authenticate(apiKey);
  }

  async checkAccess(clientId: string, endpoint: string): Promise<boolean> {
    console.log("[APIGateway] Checking API access...");
    return this.gateway.authorize(clientId, endpoint);
  }
}
```

2. Use it with any existing implementation:

```typescript
const apiAuth = new APIGatewayAuth(new JWTGateway());
const apiAuthGoogle = new APIGatewayAuth(new GoogleOAuthGateway());
```

## ✅ Benefits of Bridge Pattern

1. **Separation of Concerns**: Abstraction (how auth is used) is separate from implementation (how auth works)
2. **Independent Evolution**: Add new auth methods or app types without affecting existing code
3. **Runtime Configuration**: Switch authentication methods at runtime
4. **No Class Explosion**: N abstractions + M implementations instead of N × M combinations
5. **Single Responsibility**: Each class has one reason to change

## 🔄 Real-World Applications

This pattern is used extensively in:
- **Auth0, Okta, Keycloak**: Multiple auth providers with different client integrations
- **Database Drivers**: Different database engines with various ORM abstractions
- **Payment Systems**: Multiple payment gateways (Stripe, PayPal) with different checkout flows
- **Notification Systems**: Email, SMS, Push notifications with different service providers
- **Cloud Services**: AWS, Azure, GCP with unified SDKs

## 🆚 Bridge vs Other Patterns

| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| **Bridge** | Separate abstraction from implementation | When both abstractions and implementations need to vary independently |
| **Adapter** | Make incompatible interfaces compatible | When you need to use existing classes with incompatible interfaces |
| **Strategy** | Encapsulate algorithms | When you have multiple ways to perform the same task |
| **Abstract Factory** | Create families of related objects | When you need to create multiple related objects that work together |

The Bridge pattern is perfect for authentication systems because both the authentication methods (implementations) and the application types (abstractions) need to evolve independently.
