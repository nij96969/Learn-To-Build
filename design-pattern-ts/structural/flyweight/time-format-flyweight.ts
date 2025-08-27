import { handleError } from "../../utils/handleError";
import { ITimeFlyweight } from "./interface/flyweight-interface";

// Concrete flyweight - contains only intrinsic state (formatting rules)
export class TimeFormatFlyweight implements ITimeFlyweight {
    private readonly time_zone: string;
    private readonly locale: string;
    private readonly format: Intl.DateTimeFormatOptions;

    constructor(time_zone: string, locale: string, format: Intl.DateTimeFormatOptions) {
        this.time_zone = time_zone;
        this.locale = locale;
        this.format = format;
    }

    // Operation that uses both intrinsic state (this object) and extrinsic state (currentTime)
    formatTime(currentTime: Date): string {
        try {
            return currentTime.toLocaleString(this.locale, {
                ...this.format,
                timeZone: this.time_zone
            });
        } catch (error) {
            throw handleError(error, "TimeFormatFlyweight.formatTime");
        }
    }

    getTimeZone(): string {
        return this.time_zone;
    }

    getLocale(): string {
        return this.locale;
    }
}
