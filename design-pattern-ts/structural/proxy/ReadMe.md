# Proxy Pattern Implementation

## Overview
The Proxy Pattern provides an indirect way of accessing the original object through a proxy object. The proxy acts as a third-party system that controls access to the real object.

## Types of Proxy
- **Virtual Proxy** - Controls access to expensive-to-create objects
- **Protection Proxy** - Controls access based on permissions (implemented here)
- **Caching Proxy** - Caches results to improve performance
- **Smart Proxy** - Provides additional functionality when accessing objects

## Implementation Architecture

Our implementation demonstrates a **Protection Proxy** with a clean separation of concerns:

### Components

#### 1. **RealDocument** (`document.ts`)
The actual document that performs read/write operations.
```typescript
class RealDocument implements IDocument {
    read(user_name?: string): void
    write(user_name?: string): void
}
```

#### 2. **PermissionManager** (`permission-manager.ts`)
Dedicated class responsible for managing user permissions.
```typescript
class PermissionManager implements IUserPermissionManager {
    // Permission management methods
    addReadUser(userName: string): void
    addWriteUser(userName: string): void
    removeReadUser(userName: string): void
    removeWriteUser(userName: string): void
    
    // Permission checking methods
    hasReadAccess(userName: string): boolean
    hasWriteAccess(userName: string): boolean
    
    // Utility methods
    getReadUsers(): string[]
    getWriteUsers(): string[]
    getTotalUsersCount(): number
    displayPermissions(): void
}
```

#### 3. **ProxyDocument** (`document.ts`)
The proxy that controls access to documents by checking permissions.
```typescript
class ProxyDocument implements IDocument {
    constructor(
        private realDocument: RealDocument,
        permissionManager?: PermissionManager
    )
    
    read(user_name?: string): void    // Checks permissions before delegating
    write(user_name?: string): void   // Checks permissions before delegating
    getPermissionManager(): PermissionManager
}
```

## Key Design Principles

### Separation of Concerns
- **PermissionManager**: Handles all permission logic and user management
- **ProxyDocument**: Only handles access control checking and delegation to real document

### Benefits
1. **Modularity**: Permission logic is independent of proxy implementation
2. **Reusability**: Permission managers can be shared across multiple documents
3. **Maintainability**: Changes to permission logic don't affect proxy code
4. **Testability**: Each component can be tested independently
5. **Flexibility**: Easy to swap different permission strategies

## Usage Examples

### Basic Usage
```typescript
// Create real document
const document = new RealDocument("confidential.pdf");

// Create permission manager
const permManager = new PermissionManager(document.name);
permManager.addReadUser("alice");
permManager.addWriteUser("admin");

// Create proxy with permission manager
const proxy = new ProxyDocument(document, permManager);

// Access through proxy (permission checked)
proxy.read("alice");    // ✓ Allowed
proxy.write("alice");   // ✗ Denied
proxy.write("admin");   // ✓ Allowed
```

### Shared Permission Manager
```typescript
// One permission manager for multiple documents
const sharedManager = new PermissionManager("ProjectDocs");
sharedManager.addReadUser("team_member");
sharedManager.addWriteUser("project_lead");

const doc1Proxy = new ProxyDocument(new RealDocument("spec.md"), sharedManager);
const doc2Proxy = new ProxyDocument(new RealDocument("plan.md"), sharedManager);

// Both documents use same permissions
doc1Proxy.read("team_member");  // ✓ Allowed
doc2Proxy.read("team_member");  // ✓ Allowed
```

### Permission Management
```typescript
// Add/remove permissions dynamically
permManager.addReadUser("new_user");
permManager.removeWriteUser("old_admin");

// Check permissions
if (permManager.hasWriteAccess("user")) {
    // User can write
}

// Display current permissions
permManager.displayPermissions();
```

## Permission Rules

1. **Read Access**: Users in read list OR write list can read
2. **Write Access**: Only users in write list can write
3. **Automatic Read**: Write users automatically get read access
4. **User Validation**: Empty or undefined usernames are rejected

## Files Structure

```
proxy/
├── document.ts                 # RealDocument and ProxyDocument classes
├── permission-manager.ts       # PermissionManager class
├── interface/
│   ├── document-interface.ts   # IDocument and IDocumentAccess interfaces
│   └── user-permission-interface.ts  # Permission management interfaces
├── proxy-main.ts              # Demo implementation
└── ReadMe.md                  # This file
```

## Running the Demo

Execute the demo to see the pattern in action:
```bash
npx ts-node structural/proxy/proxy-main.ts
```

The demo showcases:
- Setting up permissions for multiple documents
- Testing read/write access with different users
- Dynamic permission management
- Shared permission managers
- Error handling for invalid access attempts

## When to Use

Use the Proxy Pattern when you need to:
- Control access to objects based on permissions
- Add security layers without modifying the original object
- Lazy load expensive objects
- Cache results for performance
- Log access attempts
- Provide additional functionality transparently