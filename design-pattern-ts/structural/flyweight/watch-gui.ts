
import { ITimeFlyweight } from "./interface/flyweight-interface";
import { IWatchWidget } from "./interface/watch-interface";
import { SingletonTime } from "./singleton-time";

// Style 1: yyyy mm dd | time
export class WatchStyle1 implements IWatchWidget {
    private time_flyweight: ITimeFlyweight;
  
    constructor() {
      this.time_flyweight = SingletonTime.getInstance();
    }
  
    render(): void {
      console.log(
        `${this.time_flyweight.getYear()} ${this.time_flyweight.getMonth()} ${this.time_flyweight.getDay()} | ${this.time_flyweight.getFormattedTime()}`
      );
    }
  }
  
  // Style 2: Year / Month | Day | Time
  export class WatchStyle2 implements IWatchWidget {
    private time_flyweight: ITimeFlyweight;
  
    constructor() {
      this.time_flyweight = SingletonTime.getInstance();
    }
  
    render(): void {
      console.log(
        `${this.time_flyweight.getYear()}\n${this.time_flyweight.getMonth()} | ${this.time_flyweight.getDay()}\n${this.time_flyweight.getFormattedTime()}`
      );
    }
  }
  
  // Style 3: Only Time
  export class WatchStyle3 implements IWatchWidget {
    private time_flyweight: ITimeFlyweight;
  
    constructor() {
        this.time_flyweight = SingletonTime.getInstance();
    }
  
    render(): void {
      console.log(this.time_flyweight.getFormattedTime());
    }
  }
  