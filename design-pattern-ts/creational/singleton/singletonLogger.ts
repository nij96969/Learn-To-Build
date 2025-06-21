import { LoggerImplementation } from "./loggerImplementation";

LoggerImplementation.initialize();
const authentication_logger = LoggerImplementation.getInstance();
const database_logger = LoggerImplementation.getInstance();

authentication_logger.log("This is a log message for authentication");
authentication_logger.error("This is an error message for authentication");
authentication_logger.warn("This is a warn message for authentication");
authentication_logger.info("This is an info message for authentication");
authentication_logger.debug("This is a debug message for authentication");

database_logger.log("This is a log message for database");
database_logger.error("This is an error message for database");
database_logger.warn("This is a warn message for database");
database_logger.info("This is an info message for database");
database_logger.debug("This is a debug message for database");

if(authentication_logger === database_logger) {
    console.log("authentication_logger and database_logger are the same instance");
}
