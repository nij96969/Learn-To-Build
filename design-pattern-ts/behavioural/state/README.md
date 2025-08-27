# State Pattern - Order Lifecycle Management

## Overview

The State pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class. This implementation demonstrates order lifecycle management where an order transitions through different states: PLACED → CONFIRMED → PACKED → SHIPPED → DELIVERED.

## Pattern Structure

### Components

1. **OrderState Interface** (`interfaces/order-state.ts`)
   - Defines the contract for all concrete states
   - Contains `next()` method for state transitions
   - Contains `name()` method to identify the state

2. **Order Context** (`order.ts`)
   - Maintains a reference to the current state
   - Delegates behavior to the current state object
   - Provides methods to change states and interact with states

3. **Concrete States** (`states/`)
   - **PlacedState**: Initial state when order is placed
   - **ConfirmedState**: Order confirmed and ready for processing
   - **PackedState**: Order packed and ready for shipping
   - **ShippedState**: Order shipped and in transit
   - **DeliveredState**: Final state when order is delivered

## Key Benefits

- **Single Responsibility**: Each state class handles its own behavior
- **Open/Closed Principle**: Easy to add new states without modifying existing code
- **Eliminates Conditional Logic**: No complex if-else or switch statements
- **State Encapsulation**: Each state knows its own transition logic

## Usage

```typescript
import { Order } from './order';
import { PlacedState } from './states/placed-state';

// Create an order with initial state
const order = new Order(new PlacedState());

// Process through states
order.proceed(); // PLACED → CONFIRMED
order.proceed(); // CONFIRMED → PACKED
order.proceed(); // PACKED → SHIPPED
order.proceed(); // SHIPPED → DELIVERED
order.proceed(); // Already delivered (no transition)
```

## State Transitions

```
PLACED → CONFIRMED → PACKED → SHIPPED → DELIVERED
```

Each state automatically transitions to the next logical state when `proceed()` is called, except for the final `DELIVERED` state which logs a completion message.

## Error Handling

All catch blocks use the centralized `handleError` utility to provide consistent error handling with contextual information.

## Running the Example

```bash
# Navigate to the state pattern directory
cd design-pattern-ts/behavioural/state

# Run the demonstration
npx ts-node state-main.ts
```

## Real-world Applications

- Order processing systems
- Document workflow management
- Game character states
- UI component states (loading, error, success)
- Media player states (playing, paused, stopped)
