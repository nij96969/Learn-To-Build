import { Passenger } from "../colleagues/passenger";
import { Driver } from "../colleagues/driver";

// Mediator Interface
export interface Mediator {
  registerPassenger(passenger: Passenger): void;
  registerDriver(driver: Driver): void;
  requestRide(passengerId: string): void;
  completeRide(passengerId: string, driverId: string): void;
}
