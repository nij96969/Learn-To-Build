import { LoggerSingleton } from "./logger-singleton";

// Lazy initialization - no need to call initialize() explicitly
const authentication_logger = LoggerSingleton.getInstance();
const database_logger = LoggerSingleton.getInstance();
const log_with_level = LoggerSingleton.getInstance();

authentication_logger.log("This is a log message for authentication");
authentication_logger.error("This is an error message for authentication");
authentication_logger.warn("This is a warn message for authentication");
authentication_logger.info("This is an info message for authentication");
authentication_logger.debug("This is a debug message for authentication");

console.log("--------------------------------");

database_logger.log("This is a log message for database");
database_logger.error("This is an error message for database");
database_logger.warn("This is a warn message for database");
database_logger.info("This is an info message for database");
database_logger.debug("This is a debug message for database");

console.log("--------------------------------");

log_with_level.logWithLevel("log", "This is a log message for log_with_level");
log_with_level.logWithLevel("error", "This is an error message for log_with_level");
log_with_level.logWithLevel("warn", "This is a warn message for log_with_level");
log_with_level.logWithLevel("info", "This is an info message for log_with_level");
log_with_level.logWithLevel("debug", "This is a debug message for log_with_level");

console.log("--------------------------------");

if(authentication_logger === database_logger) {
    console.log("authentication_logger and database_logger are the same instance");
}

if(authentication_logger === log_with_level) {
    console.log("authentication_logger and log_with_level are the same instance");
}

if(database_logger === log_with_level) {
    console.log("database_logger and log_with_level are the same instance");
}

// Example of lazy initialization with file logging
// const file_logger = LoggerSingleton.getInstance(true, "app.log");
// file_logger.info("This message will be written to both console and file");
