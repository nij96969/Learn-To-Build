import { Logger } from "./Logger";
import fs from "fs";

export class LoggerSingleton implements Logger {
    private static logger_instance: LoggerSingleton;
    private file_path: string = '';
    private write_to_file: boolean = false;

    private constructor() {}

    private writeToFile(message: string): void {
        if (this.write_to_file && this.file_path) {
            fs.appendFileSync(this.file_path, message + "\n");
        }
    }

    private formatMessage(level: string, message: string): string {
        return `[${level.toUpperCase()}] ${message}`;
    }

    /**
     * Common method to handle logging at different levels
     * @param level The log level (log, error, warn, info, debug)
     * @param message The message to log
     */
    public logWithLevel(level: 'log' | 'error' | 'warn' | 'info' | 'debug', message: string): void {
        const formatted = this.formatMessage(level, message);
        
        // Use the appropriate console method based on level
        switch (level) {
            case 'error':
                console.error(formatted);
                break;
            case 'warn':
                console.warn(formatted);
                break;
            case 'info':
                console.info(formatted);
                break;
            case 'debug':
                console.debug(formatted);
                break;
            default:
                console.log(formatted);
        }
        
        this.writeToFile(formatted);
    }

    /**
     * Initialize the logger singleton instance with optional file writing capability
     * @param write_to_file Whether to write logs to a file (default: false)
     * @param file_path Path to the log file (required if write_to_file is true)
     */
    public static initialize(write_to_file: boolean = false, file_path?: string): void {
        // Create instance if it doesn't exist
        if (!LoggerSingleton.logger_instance) {
            LoggerSingleton.logger_instance = new LoggerSingleton();
        }

        // Configure file writing
        LoggerSingleton.logger_instance.write_to_file = write_to_file;
        
        // Validate file path if writing to file
        if (write_to_file) {
            if (!file_path) {
                throw new Error("file_path must be provided when write_to_file is true");
            }
            LoggerSingleton.logger_instance.file_path = file_path;
        }
    }

    /**
     * Get the singleton instance with lazy initialization
     * @param write_to_file Whether to write logs to a file (default: false, only used on first call)
     * @param file_path Path to the log file (only used on first call if write_to_file is true)
     */
    public static getInstance(write_to_file: boolean = false, file_path?: string): LoggerSingleton {
        if (!LoggerSingleton.logger_instance) {
            LoggerSingleton.initialize(write_to_file, file_path);
        }
        return LoggerSingleton.logger_instance!;
    }

    public log(message: string): void {
        this.logWithLevel('log', message);
    }

    public error(message: string): void {
        this.logWithLevel('error', message);
    }

    public warn(message: string): void {
        this.logWithLevel('warn', message);
    }

    public info(message: string): void {
        this.logWithLevel('info', message);
    }

    public debug(message: string): void {
        this.logWithLevel('debug', message);
    }
} 