import { RideMediator } from "./ride-mediator";
import { Passenger } from "./colleagues/passenger";
import { Driver } from "./colleagues/driver";

// -------------------------
// Usage Example
// -------------------------
const mediator = new RideMediator();

const passenger1 = new Passenger("p1", "Alice", mediator);
const passenger2 = new Passenger("p2", "Bob", mediator);

const driver1 = new Driver("d1", "John", mediator);
const driver2 = new Driver("d2", "Mike", mediator);

mediator.registerPassenger(passenger1);
mediator.registerPassenger(passenger2);

mediator.registerDriver(driver1);
mediator.registerDriver(driver2);

passenger1.requestRide();  // Alice matched with John
passenger2.requestRide();  // Bob matched with Mike

// Try to request rides again before completing - should be blocked
passenger1.requestRide();  // Alice tries again (should be blocked)
passenger2.requestRide();  // Bob tries again (should be blocked)

driver1.completeRide();    // Ride completed for Alice
driver2.completeRide();    // Ride completed for Bob with Mike

// Now they can request new rides
passenger2.requestRide();  // Bob can request againß
passenger1.requestRide();  // Alice can request again