const winston = require("winston");
require("winston-daily-rotate-file");

const infoTransport = new winston.transports.DailyRotateFile({
  level: "info",
  filename: "info-%DATE%.log",
  dirname: `./logs/info`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "100m",
  maxFiles: "14d",
});
const errorTransport = new winston.transports.DailyRotateFile({
  level: "error",
  filename: "error-%DATE%.log",
  dirname: `./logs/error`,
  datePattern: "YYYY-MM",
  zippedArchive: true,
  maxSize: "100m",
  maxFiles: "14d",
});

const infoLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [infoTransport],
});

const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [errorTransport],
});

module.exports = (err, req, res, next) => {
  const result = err !== "logger" ? "failed" : "success";

  const userAgent = req.get("User-Agent");
  const reqBody = JSON.stringify(req.body);

  if (result === "success") {
    infoLogger.info(
      `${new Date().toISOString()} | ${req.connection.remoteAddress} | ${
        req.claims?.username
      } | ${req.method} | ${req.url} | ${
        res.statusCode
      } | ${userAgent} | ${reqBody} | ${result}`
    );
  } else if (result === "failed") {
    errorLogger.error(
      `${new Date().toISOString()} | ${req.connection.remoteAddress} | ${
        req.claims?.username
      } | ${req.method} | ${req.url} | ${
        res.statusCode
      } | ${userAgent} | ${reqBody} | ${err.message}`
    );
  }
};
