# Mediator Pattern Implementation

## Overview
The **Mediator Pattern** defines how a set of objects interact with each other. Instead of objects communicating directly, they communicate through a central mediator object. This promotes loose coupling by keeping objects from referring to each other explicitly.

## Pattern Structure

```
┌─────────────────────┐    ┌──────────────────────┐
│     Passenger       │    │       Driver         │
│   (Colleague)       │    │    (Colleague)       │
└─────────────────────┘    └──────────────────────┘
           │                           │
           └─────────┐         ┌───────┘
                     │         │
                     ▼         ▼
              ┌─────────────────────┐
              │   RideMediator      │
              │    (Mediator)       │
              └─────────────────────┘
```

## Implementation

### Core Components
- **Mediator Interface**: Defines the contract for mediator communication
- **RideMediator**: Concrete mediator that coordinates ride-sharing operations
- **Passenger**: Colleague class that requests rides through the mediator
- **Driver**: Colleague class that accepts rides through the mediator

## Key Mediator Pattern Features

1. **Bidirectional Communication**: Both passengers and drivers communicate through the mediator
2. **Colleague References**: Both Passenger and Driver hold references to the mediator
3. **Decoupled Components**: Passengers and drivers don't know about each other directly
4. **Centralized Logic**: All ride-matching logic is handled by the mediator

## Files Structure

```
mediator/
├── interfaces/
│   └── mediator.ts               # Mediator interface definition
├── colleagues/
│   ├── passenger.ts              # Passenger colleague class
│   └── driver.ts                 # Driver colleague class
├── ride-mediator.ts              # Concrete mediator implementation
├── mediator-main.ts              # Usage example and demonstration
└── README.md                     # This documentation
```

## How It Works

1. **Registration**: Passengers and drivers register with the mediator
2. **Request**: Passengers request rides through the mediator
3. **Matching**: Mediator finds available drivers and matches them with passengers
4. **Completion**: Drivers complete rides and notify the mediator to update availability

## Example Usage

```typescript
import { RideMediator } from "./ride-mediator";
import { Passenger } from "./colleagues/passenger";
import { Driver } from "./colleagues/driver";

// Create mediator and register participants
const mediator = new RideMediator();

const passenger1 = new Passenger("p1", "Alice", mediator);
const driver1 = new Driver("d1", "John", mediator);

mediator.registerPassenger(passenger1);
mediator.registerDriver(driver1);

// Request and complete rides
passenger1.requestRide();  // Alice matched with John
driver1.completeRide();    // Ride completed, John becomes available again
```

## Benefits

1. **Loose Coupling**: Components don't need direct references to each other
2. **Centralized Control**: Complex interaction logic is managed in one place
3. **Reusability**: Components can be reused with different mediators
4. **Maintainability**: Changes to interaction logic only affect the mediator

## When to Use

- When you have multiple objects that need to communicate in complex ways
- When you want to avoid tight coupling between communicating objects
- When communication logic is complex and changes frequently
- When you need to centralize control flow between multiple components

## Console Output Example

```
Passenger Alice registered.
Passenger Bob registered.
Driver John registered.
Driver Mike registered.
Ride confirmed: Passenger Alice with Driver John
Ride confirmed: Passenger Bob with Driver Mike
Ride completed: Passenger Alice with Driver John
No available drivers for passenger Bob
```

## Error Handling

The implementation includes comprehensive error handling using the `handleError` utility function, which provides context-aware error messages for debugging and monitoring purposes.