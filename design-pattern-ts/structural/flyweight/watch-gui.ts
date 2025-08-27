
import { ITimeFlyweight } from "./interface/flyweight-interface";
import { IWatchWidget } from "./interface/watch-interface";
import { TimeFormatFactory } from "./time-format-factory";
import { handleError } from "../../utils/handleError";

// Context class - stores extrinsic state (current time, position, etc.)
export class WatchContext {
    private currentTime: Date;
    private position: { x: number; y: number };

    constructor(x: number = 0, y: number = 0) {
        try{
            this.currentTime = new Date();
            this.position = { x, y };
        }catch(error){
            throw handleError(error);
        }
    }

    // Update extrinsic state
    updateTime(): void {
        try{
            this.currentTime = new Date();
        }catch(error){
            throw handleError(error);
        }
    }

    getCurrentTime(): Date {
        return this.currentTime;
    }

    getPosition(): { x: number; y: number } {
        return this.position;
    }
}

// Style 1: Full date and time (US format)
export class WatchStyle1 implements IWatchWidget {
    private timeFlyweight: ITimeFlyweight;
    private context: WatchContext;
  
    constructor(context: WatchContext) {
        // Get flyweight with specific formatting (intrinsic state)
        this.timeFlyweight = TimeFormatFactory.getTimeFormat(
            "America/New_York",
            "en-US",
            { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        );
        this.context = context;
    }
  
    render(): void {
        try{    
        this.context.updateTime(); // Update extrinsic state
        const formattedTime = this.timeFlyweight.formatTime(this.context.getCurrentTime());
            const pos = this.context.getPosition();
            console.log(`[Watch@(${pos.x},${pos.y})] Style1: ${formattedTime}`);
        }catch(error){
            throw handleError(error);
        }
    }
}
  
// Style 2: European format
export class WatchStyle2 implements IWatchWidget {
    private timeFlyweight: ITimeFlyweight;
    private context: WatchContext;
  
    constructor(context: WatchContext) {
        // Different flyweight for European formatting
        this.timeFlyweight = TimeFormatFactory.getTimeFormat(
            "Europe/London",
            "en-GB",
            { 
                day: '2-digit',
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        );
        this.context = context;
    }
  
    render(): void {
        this.context.updateTime();
        const formattedTime = this.timeFlyweight.formatTime(this.context.getCurrentTime());
        const pos = this.context.getPosition();
        console.log(`[Watch@(${pos.x},${pos.y})] Style2: ${formattedTime}`);
    }
}
  
// Style 3: Time only (Asian format)
export class WatchStyle3 implements IWatchWidget {
    private timeFlyweight: ITimeFlyweight;
    private context: WatchContext;
  
    constructor(context: WatchContext) {
        // Another flyweight for time-only format
        this.timeFlyweight = TimeFormatFactory.getTimeFormat(
            "Asia/Tokyo",
            "ja-JP",
            { 
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        );
        this.context = context;
    }
  
    render(): void {
        this.context.updateTime();
        const formattedTime = this.timeFlyweight.formatTime(this.context.getCurrentTime());
        const pos = this.context.getPosition();
        console.log(`[Watch@(${pos.x},${pos.y})] Style3: ${formattedTime}`);
    }
}