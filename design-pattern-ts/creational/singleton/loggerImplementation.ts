import { Logger } from "./loggerInterface";
import fs from "fs";

export class LoggerImplementation implements Logger {
    private static logger_instance: LoggerImplementation;
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
     * Initialize the logger singleton instance with optional file writing capability
     * @param write_to_file Whether to write logs to a file (default: false)
     * @param file_path Path to the log file (required if write_to_file is true)
     */
    public static initialize(write_to_file: boolean = false, file_path?: string): void {
        // Create instance if it doesn't exist
        if (!LoggerImplementation.logger_instance) {
            LoggerImplementation.logger_instance = new LoggerImplementation();
        }

        // Configure file writing
        LoggerImplementation.logger_instance.write_to_file = write_to_file;
        
        // Validate file path if writing to file
        if (write_to_file) {
            if (!file_path) {
                throw new Error("file_path must be provided when write_to_file is true");
            }
            LoggerImplementation.logger_instance.file_path = file_path;
        }
    }

    public static getInstance(): LoggerImplementation {
        if (!LoggerImplementation.logger_instance) {
            throw new Error("Logger not initialized. Call LoggerImplementation.initialize() first.");
        }
        return LoggerImplementation.logger_instance;
    }

    public log(message: string): void {
        const formatted = this.formatMessage("log", message);
        console.log(formatted);
        this.writeToFile(formatted);
    }

    public error(message: string): void {
        const formatted = this.formatMessage("error", message);
        console.error(formatted);
        this.writeToFile(formatted);
    }

    public warn(message: string): void {
        const formatted = this.formatMessage("warn", message);
        console.warn(formatted);
        this.writeToFile(formatted);
    }

    public info(message: string): void {
        const formatted = this.formatMessage("info", message);
        console.info(formatted);
        this.writeToFile(formatted);
    }

    public debug(message: string): void {
        const formatted = this.formatMessage("debug", message);
        console.debug(formatted);
        this.writeToFile(formatted);
    }
}
