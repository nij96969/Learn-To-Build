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
            console.log(`Creating new flyweight for: ${key}`);
            this.flyweights.set(key, new TimeFormatFlyweight(timeZone, locale, format));
        } else {
            console.log(`Reusing existing flyweight for: ${key}`);
        }
        
        return this.flyweights.get(key)!;
    }

    // Helper method to see how many flyweights are created
    public static getCreatedFlyweightsCount(): number {
        return this.flyweights.size;
    }

    // Method to get all created flyweight keys (for debugging)
    public static getCreatedFlyweightKeys(): string[] {
        return Array.from(this.flyweights.keys());
    }
}
