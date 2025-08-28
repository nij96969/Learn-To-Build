import { handleError } from "../../../utils/handleError";
import { Mediator } from "../interfaces/mediator";
import { Driver } from "./driver";

// Colleague: Passenger
export class Passenger {
  constructor(public id: string, public name: string, private mediator: Mediator) {}

  private driver: Driver | null = null;

  requestRide() {
    try {
      this.mediator.requestRide(this.id);
    } catch (err) {
      throw handleError(err, "Passenger.requestRide");
    }
  }

  assignDriver(driver: Driver) {
    try {
      this.driver = driver;
    } catch (err) {
      throw handleError(err, "Passenger.assignDriver");
    }
  }

  clearRide() {
    try {
      this.driver = null;
    } catch (err) {
      throw handleError(err, "Passenger.clearRide");
    }
  }
}
