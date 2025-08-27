import { ITimeFlyweight } from "./interface/flyweight-interface";
import { TimeFormatFlyweight } from "./time-format-flyweight";

// Flyweight Factory - ensures flyweights are shared properly
export class TimeFormatFactory {
    private static flyweights: Map<string, ITimeFlyweight> = new Map();

    // Factory method to get or create flyweight based on intrinsic state
    public static getTimeFormat(
        timeZone: string, 
        locale: string, 
        format: Intl.DateTimeFormatOptions
    ): ITimeFlyweight {
        const key = `${timeZone}-${locale}-${JSON.stringify(format)}`;
        
        if (!this.flyweights.has(key)) {
            // Create a new flyweight if it doesn't exist
            this.flyweights.set(key, new TimeFormatFlyweight(timeZone, locale, format));
        }
        
        // Return the flyweight for the given key
        return this.flyweights.get(key)!;
    }
}
