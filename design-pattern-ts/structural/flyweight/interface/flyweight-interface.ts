// Intrinsic state: Time formatting rules (shared across similar watches)
export interface ITimeFlyweight {
    formatTime(currentTime: Date): string;
    getTimeZone(): string;
    getLocale(): string;
}