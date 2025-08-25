export interface ITimeFlyweight {
    getFormattedTime(): string;
    getYear(): number;
    getMonth(): string;
    getDay(): string;
}