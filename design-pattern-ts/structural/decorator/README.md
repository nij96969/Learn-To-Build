# 🎭 Decorator Pattern for API Calls

> **Real-world implementation -> SDKs, API gateways, and middleware architectures**

## 📚 Table of Contents

- [Overview](#-overview)
- [Pattern Structure](#-pattern-structure)
- [Implementation](#-implementation)
- [Usage Examples](#-usage-examples)
- [Industry Applications](#-industry-applications)
- [Middleware Architecture](#-middleware-architecture)
- [Running the Demo](#-running-the-demo)
- [Key Benefits](#-key-benefits)
- [Common Use Cases](#-common-use-cases)

## 🎯 Overview

The **Decorator Pattern** allows you to dynamically add new behaviors to objects by wrapping them in decorator objects. This implementation demonstrates how modern APIs, SDKs, and backend services use this pattern to create flexible, composable middleware architectures.

### Real-World Examples
- **AWS SDK**: Authentication, retry logic, request signing
- **Express.js**: Middleware for logging, auth, compression
- **API Gateways**: Rate limiting, authentication, monitoring
- **HTTP Clients**: Axios interceptors, fetch middleware

## 🏗 Pattern Structure

```
IApiHandler (Interface)
    ├── BaseApiHandler (Concrete Implementation)
    └── ApiDecorator (Abstract Decorator)
        ├── LoggingDecorator
        └── AuthDecorator
```

### Components

1. **IApiHandler**: Common interface for all API handlers
2. **BaseApiHandler**: Concrete implementation that makes actual HTTP calls
3. **ApiDecorator**: Abstract base class for all decorators
4. **Concrete Decorators**: Specific behavior implementations

## 💻 Implementation

### Core Interface

```typescript
export interface IApiHandler {
    request(endpoint: string, data?: any): Promise<any>;
}
```

### Base Implementation

```typescript
export class BaseApiHandler implements IApiHandler {
    async request(endpoint: string, data: any = {}): Promise<any> {
        // Simulates real HTTP call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    endpoint,
                    data,
                    response: "OK from server",
                    timestamp: new Date().toISOString(),
                    status: 200
                });
            }, 300);
        });
    }
}
```

### Decorator Implementations

#### 🔍 Logging Decorator
- Logs request/response details
- Measures execution time
- Handles error logging
- Similar to **Winston**, **Datadog**, **NewRelic**

```typescript
export class LoggingDecorator extends ApiDecorator {
    async request(endpoint: string, data?: any): Promise<any> {
        console.log(`🚀 [LOG] Starting API call to: ${endpoint}`);
        const result = await super.request(endpoint, data);
        console.log(`✅ [LOG] Success response from ${endpoint}:`, result);
        return result;
    }
}
```

#### 🔐 Authentication Decorator
- Validates authentication tokens
- Adds authorization headers
- Handles auth failures
- Similar to **API Gateways** (Kong, Apigee, AWS API Gateway)

```typescript
export class AuthDecorator extends ApiDecorator {
    constructor(apiHandler: IApiHandler, private token: string | null) {
        super(apiHandler);
    }

    async request(endpoint: string, data?: any): Promise<any> {
        if (!this.token) {
            throw new Error("Unauthorized: No token provided");
        }
        return super.request(endpoint, data);
    }
}
```

## 🚀 Usage Examples

### Basic Composition

```typescript
// Start with base handler
let api: IApiHandler = new BaseApiHandler();

// Add decorators in desired order
api = new LoggingDecorator(api);
api = new AuthDecorator(api, "Bearer abc123");

// Use the composed API
const response = await api.request("/users", { id: 1 });
```

### Conditional Composition

```typescript
function createApiHandler(options: ApiClientOptions): IApiHandler {
    let api: IApiHandler = new BaseApiHandler();

    if (options.enableLogging) {
        api = new LoggingDecorator(api);
    }

    if (options.authToken) {
        api = new AuthDecorator(api, options.authToken);
    }

    return api;
}
```

## 🏭 Industry Applications

### API Gateways
```typescript
// Kong/Apigee-style gateway
api = new RateLimitDecorator(api, { rpm: 100 });
api = new AuthDecorator(api, tokenValidator);
api = new LoggingDecorator(api);
api = new MetricsDecorator(api);
```

### SDK Development
```typescript
// AWS SDK-style composition
api = new SigningDecorator(api, awsCredentials);
api = new RetryDecorator(api, { maxRetries: 3 });
api = new RegionDecorator(api, "us-east-1");
api = new LoggingDecorator(api);
```

### Microservices
```typescript
// Service mesh-style middleware
api = new CircuitBreakerDecorator(api);
api = new LoadBalancerDecorator(api, serviceInstances);
api = new MetricsDecorator(api);
api = new TracingDecorator(api);
```

## 🔄 Middleware Architecture

The Decorator pattern is **foundational to middleware-driven architectures**:

### Express.js Middleware
```javascript
app.use(loggingMiddleware);    // LoggingDecorator
app.use(authMiddleware);       // AuthDecorator
app.use(finalHandler);         // BaseApiHandler
```

### HTTP Client Interceptors
```javascript
// Axios interceptors work like decorators
axios.interceptors.request.use(authInterceptor);
axios.interceptors.request.use(loggingInterceptor);
```

### Key Middleware Characteristics

1. **Composable**: Stack behaviors like LEGO blocks
2. **Order-dependent**: Execution flow depends on composition order
3. **Single Responsibility**: Each middleware/decorator has one job
4. **Chain of Responsibility**: Request flows through the chain
5. **Runtime Configuration**: Enable/disable features dynamically

## 🎮 Running the Demo

```bash
# Navigate to the decorator directory
cd design-pattern-ts/structural/decorator

# Run the TypeScript demo
npx ts-node decorator-main.ts
```

### Expected Output

```
🎭 Decorator Pattern for API Calls - Real World Example
============================================================

📞 === FIRST CALL (Authenticated request) ===
🚀 [LOG] Starting API call to: /users
🔐 [AUTH] Token validated for /users: Bearer a***c123
✅ [LOG] Success response from /users (301ms): {...}

📞 === SECOND CALL (Different user) ===
🚀 [LOG] Starting API call to: /users
🔐 [AUTH] Token validated for /users: Bearer a***c123
✅ [LOG] Success response from /users (298ms): {...}
```

## 🎯 Key Benefits

### 1. **Flexibility**
- Add/remove behaviors at runtime
- Different configurations for different environments

### 2. **Composability**
- Mix and match decorators as needed
- Create complex behaviors from simple components

### 3. **Single Responsibility**
- Each decorator has one clear purpose
- Easy to test and maintain

### 4. **Open/Closed Principle**
- Open for extension (new decorators)
- Closed for modification (existing code unchanged)

### 5. **Runtime Configuration**
- Enable features based on environment
- A/B testing capabilities

## 📋 Common Use Cases

### Development vs Production

```typescript
// Development: Only logging
const devApi = createApiHandler({
    enableLogging: true,
    authToken: null
});

// Production: All features
const prodApi = createApiHandler({
    enableLogging: true,
    authToken: process.env.AUTH_TOKEN
});
```

### Feature Flags

```typescript
// Enable features based on flags
if (featureFlags.enableAdvancedAuth) {
    api = new MFADecorator(api);
} else {
    api = new BasicAuthDecorator(api);
}
```

### A/B Testing

```typescript
// Different behavior for different user groups
if (user.isInExperimentGroup('advanced-auth')) {
    api = new MFADecorator(api);
}
api = new StandardAuthDecorator(api);
```

## 🔍 Advanced Patterns

### Decorator Factories

```typescript
function createAuthDecorator(token: string) {
    return (api: IApiHandler) => new AuthDecorator(api, token);
}

function createLoggingDecorator() {
    return (api: IApiHandler) => new LoggingDecorator(api);
}

// Functional composition
const enhancedApi = pipe(
    createAuthDecorator("Bearer token"),
    createLoggingDecorator()
)(new BaseApiHandler());
```

### Conditional Decorators

```typescript
function conditionalDecorator<T extends IApiHandler>(
    condition: boolean,
    decoratorFn: (api: IApiHandler) => T
) {
    return (api: IApiHandler): IApiHandler => {
        return condition ? decoratorFn(api) : api;
    };
}
```

## 🌟 Why Decorators Excel in Middleware Architectures

1. **Natural Fit**: Middleware is essentially decoration of request processing
2. **Dynamic Composition**: Enable/disable middleware at runtime
3. **Order Control**: Precise control over execution order
4. **Cross-cutting Concerns**: Perfect for auth, logging, metrics, validation
5. **Testability**: Each decorator can be tested in isolation
6. **Performance**: Add features without base implementation changes

---

## 📖 Related Patterns

- **Chain of Responsibility**: Similar execution flow
- **Proxy**: Similar structure, different intent
- **Strategy**: Different algorithms, decorators add behavior
- **Composite**: Tree structures vs linear decoration

---

**💡 Pro Tip**: The Decorator pattern is your secret weapon for building scalable, maintainable middleware architectures. It's the backbone of modern web frameworks, API gateways, and SDKs!
