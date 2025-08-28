import { handleError } from "../../../utils/handleError";
import { Mediator } from "../interfaces/mediator";
import { Passenger } from "./passenger";

// Colleague: Driver
export class Driver {
  public isAvailable = true;
  private passenger: Passenger | null = null;

  constructor(public id: string, public name: string, private mediator: Mediator) {}

  assignPassenger(passenger: Passenger) {
    try {
      this.passenger = passenger;
    } catch (err) {
      throw handleError(err, "Driver.assignPassenger");
    }
  }

  clearRide() {
    try {
      this.passenger = null;
    } catch (err) {
      throw handleError(err, "Driver.clearRide");
    }
  }

  completeRide() {
    try {
      if (this.passenger) {
        this.mediator.completeRide(this.passenger.id, this.id);
      }
    } catch (err) {
      throw handleError(err, "Driver.completeRide");
    }
  }
}
