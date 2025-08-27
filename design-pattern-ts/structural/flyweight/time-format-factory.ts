import { ITimeFlyweight } from "./interface/flyweight-interface";
import { TimeFormatFlyweight } from "./time-format-flyweight";
import { handleError } from "../../utils/handleError";

export class TimeFormatFactory {
  private static flyweights: Map<string, ITimeFlyweight> = new Map();

  public static getTimeFormat(
    time_zone: string, 
    locale: string, 
    format: Intl.DateTimeFormatOptions
  ): ITimeFlyweight {
    try {
      if (!time_zone || !locale) {
        throw new Error("Invalid timeZone or locale provided");
      }

      const key = `${time_zone}-${locale}-${JSON.stringify(format)}`;

      if (!this.flyweights.has(key)) {
        this.flyweights.set(key, new TimeFormatFlyweight(time_zone, locale, format));
      }

      return this.flyweights.get(key)!;
    } catch (err) {
      throw handleError(err);
    }
  }
}
