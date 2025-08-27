# Mediator Pattern Implementation

## Overview
The **Mediator Pattern** defines how a set of objects interact with each other. Instead of objects communicating directly, they communicate through a central mediator object. This promotes loose coupling by keeping objects from referring to each other explicitly.

## Pattern Structure

```
┌─────────────────────┐    ┌──────────────────────┐
│ UserManagementService│    │   UserGroupService   │
└─────────────────────┘    └──────────────────────┘
           │                           │
           └─────────┐         ┌───────┘
                     │         │
                     ▼         ▼
              ┌─────────────────────┐
              │ OrchestrationService│
              │    (Mediator)       │
              └─────────────────────┘
```

## Implementation

### Services
- **UserManagementService**: Handles user creation operations
- **UserGroupService**: Manages user-to-group assignments

### Mediator
- **OrchestrationService**: Coordinates the workflow between services without them knowing about each other

## Files Structure

```
mediator/
├── services/
│   ├── userManagementService.ts   # User creation service
│   └── userGroupService.ts        # Group assignment service
├── orchestrationService.ts        # Mediator implementation
└── mediator-main.ts              # Entry point demonstration
```

## How It Works

1. **Loose Coupling**: Services don't directly communicate with each other
2. **Centralized Control**: The mediator handles all inter-service communication
3. **Workflow Orchestration**: Complex business processes are managed in one place
4. **Reusability**: Services can be reused in different workflows through different mediators

## Example Usage

```typescript
const orchestrator = new OrchestrationService();

const result = await orchestrator.createUserAndAssignGroup(
  { name: "Alice", email: "alice@example.com" },
  "admins"
);

console.log("Final Result:", result);
```

## Benefits

1. **Reduced Dependencies**: Services don't need to know about each other
2. **Easier Maintenance**: Changes to workflow logic are centralized
3. **Reusable Components**: Services can be used in different contexts
4. **Single Responsibility**: Each service focuses on its specific task

## When to Use

- When you have multiple objects that need to communicate in complex ways
- When you want to avoid tight coupling between communicating objects
- When you need to centralize complex communications and control logic
- When you want to reuse object behavior in different contexts

## Console Output Example

```
🚦 Starting orchestration workflow...
➡️ Creating user in User Management Service: { name: "Alice", email: "alice@example.com" }
➡️ Assigning user u123 to group admins
✅ Workflow complete.
Final Result: {
  user: { userId: "u123", name: "Alice", email: "alice@example.com" },
  groupAssignment: { userId: "u123", groupId: "admins", status: "assigned" },
  message: "User created and assigned to group successfully"
}
```
