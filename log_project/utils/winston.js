const winston = require("winston");
const { format } = require("winston");
//winston package에 format을 가져온다.
const { combine } = format;
require("winston-daily-rotate-file");

const transport = new winston.transports.DailyRotateFile({
  level: "info",
  filename: "./logs/%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "1d",
  format : combine(
    format.timestamp({format:"YYYY-MM-DD HH:mm:ss"}),
    format.json()
  ),
});

const logger = winston.createLogger({
  transports: [transport],
});

module.exports = { logger };