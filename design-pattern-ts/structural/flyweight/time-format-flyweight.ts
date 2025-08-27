import { ITimeFlyweight } from "./interface/flyweight-interface";

// Concrete flyweight - contains only intrinsic state (formatting rules)
export class TimeFormatFlyweight implements ITimeFlyweight {
    private readonly timeZone: string;
    private readonly locale: string;
    private readonly format: Intl.DateTimeFormatOptions;

    constructor(timeZone: string, locale: string, format: Intl.DateTimeFormatOptions) {
        this.timeZone = timeZone;
        this.locale = locale;
        this.format = format;
    }

    // Operation that uses both intrinsic state (this object) and extrinsic state (currentTime)
    formatTime(currentTime: Date): string {
        return currentTime.toLocaleString(this.locale, {
            ...this.format,
            timeZone: this.timeZone
        });
    }

    getTimeZone(): string {
        return this.timeZone;
    }

    getLocale(): string {
        return this.locale;
    }
}
