import { Order } from './order';
import { PlacedState } from './states/placed-state';
import { handleError } from '../../utils/handleError';

/**
 * STATE PATTERN FOR ORDER LIFECYCLE
 * 
 * This example demonstrates the State pattern implementation for managing
 * order lifecycle transitions. Each state encapsulates the behavior and
 * knows how to transition to the next state.
 * 
 * States: PLACED → CONFIRMED → PACKED → SHIPPED → DELIVERED
 */

function demonstrateStatePattern(): void {
  try {
    console.log("🚀 Starting State Pattern Demo - Order Lifecycle\n");
    
    // Create an order with initial state
    const order = new Order(new PlacedState());
    
    console.log("📋 Initial State:", order.getState());
    console.log("=" .repeat(50));
    
    // Demonstrate state transitions
    console.log("\n🔄 Processing order through lifecycle states:\n");
    
    order.proceed(); // PLACED → CONFIRMED
    order.proceed(); // CONFIRMED → PACKED
    order.proceed(); // PACKED → SHIPPED
    order.proceed(); // SHIPPED → DELIVERED
    order.proceed(); // Already delivered
    
    console.log("\n" + "=" .repeat(50));
    console.log("📊 Final State:", order.getState());
    console.log("✨ State Pattern Demo completed successfully!");
    
  } catch (err) {
    throw handleError(err, 'State Pattern Demo');
  }
}

// Run the demonstration
console.log("🎯 STATE PATTERN - Order Lifecycle Management");
console.log("=" .repeat(60));

demonstrateStatePattern();
