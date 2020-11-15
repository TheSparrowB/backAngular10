import winston = require("winston");
const { combine, timestamp, printf, colorize } = winston.format;

import configGeneral = require("../config/general");
import configLog = require("../config/log");

const customFormat = printf(info => {
    return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), customFormat),
    transports: [
        new winston.transports.File({
            filename: `${configGeneral.pathDirectoryLog}/error.log`,
            level: "error",
            handleExceptions: true,
            maxsize: configLog.maxsize,
            maxFiles: configLog.maxFiles
        }),
        new winston.transports.File({
            filename: `${configGeneral.pathDirectoryLog}/combine.log`,
            maxsize: configLog.maxsize,
            maxFiles: configLog.maxFiles
        })
    ]
});

if (process.env.NODE_ENV !== "produccion") {
    logger.add(
        new winston.transports.Console({
            level: "debug",
            format: combine(colorize(), timestamp(), customFormat)
        })
    );
}

export { logger };
