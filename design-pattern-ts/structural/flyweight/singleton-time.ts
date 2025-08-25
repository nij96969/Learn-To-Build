import { TimeFlyweight } from "./flyweight";
import { ITimeFlyweight } from "./interface/flyweight-interface";

export class SingletonTime {
    private static instance: ITimeFlyweight;

    private constructor() {}

    public static getInstance(): ITimeFlyweight { // Lazy initializationz
        if (!SingletonTime.instance) {
            SingletonTime.instance = new TimeFlyweight();
        }
        return SingletonTime.instance;
    }
}