import { handleError } from "../../utils/handleError";
import { Mediator } from "./interfaces/mediator";
import { Passenger } from "./colleagues/passenger";
import { Driver } from "./colleagues/driver";

// Concrete Mediator
export class RideMediator implements Mediator {
  private passengers: Map<string, Passenger> = new Map();
  private drivers: Map<string, Driver> = new Map();
  private activeRides: Map<string, string> = new Map(); // Track active rides: passengerId -> driverId

  registerPassenger(passenger: Passenger): void {
    try {
      this.passengers.set(passenger.id, passenger);
      console.log(`Passenger ${passenger.name} registered.`);
    } catch (err) {
      throw handleError(err, "RideMediator.registerPassenger");
    }
  }

  registerDriver(driver: Driver): void {
    try {
      this.drivers.set(driver.id, driver);
      console.log(`Driver ${driver.name} registered.`);
    } catch (err) {
      throw handleError(err, "RideMediator.registerDriver");
    }
  }

  requestRide(passengerId: string): void {
    try {
      const passenger = this.passengers.get(passengerId);
      if (!passenger) {
        throw new Error(`Passenger with ID ${passengerId} not found`);
      }

      // Check if passenger has an active ride that hasn't been completed
      if (this.activeRides.has(passengerId)) {
        console.log(`Passenger ${passenger.name} has not completed the current ride`);
        return;
      }

      // Find any available driver
      const availableDriver = Array.from(this.drivers.values()).find(d => d.isAvailable);

      if (availableDriver) {
        availableDriver.assignPassenger(passenger);
        passenger.assignDriver(availableDriver);
        availableDriver.isAvailable = false;
        
        // Track the active ride
        this.activeRides.set(passengerId, availableDriver.id);
        
        console.log(`Ride confirmed: Passenger ${passenger.name} with Driver ${availableDriver.name}`);
      } else {
        console.log(`No available drivers for passenger ${passenger.name}`);
      }
    } catch (err) {
      throw handleError(err, "RideMediator.requestRide");
    }
  }

  completeRide(passengerId: string, driverId: string): void {
    try {
      const passenger = this.passengers.get(passengerId);
      const driver = this.drivers.get(driverId);

      if (passenger && driver) {
        console.log(`Ride completed: Passenger ${passenger.name} with Driver ${driver.name}`);
        passenger.clearRide();
        driver.clearRide();
        driver.isAvailable = true;
        
        // Remove the active ride
        this.activeRides.delete(passengerId);
      }
    } catch (err) {
      throw handleError(err, "RideMediator.completeRide");
    }
  }
}
