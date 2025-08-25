import { ITimeFlyweight } from "./interface/flyweight-interface";

export class TimeFlyweight implements ITimeFlyweight {
    private readonly time: Date;

    constructor() {
        this.time = new Date();
    }

    getFormattedTime(): string {
        return this.time.toLocaleTimeString();
    }

    getYear(): number {
        return this.time.getFullYear();
      }
    
    getMonth(): string {
        return this.time.toLocaleString("default", { month: "long" });
    }
    
    getDay(): string {
        return this.time.toLocaleString("default", { weekday: "long" });
    }
}