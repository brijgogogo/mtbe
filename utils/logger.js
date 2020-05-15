const pino = require("pino");
// const config = require("../config");
// const path = require("path");

// const logsDir = `${config.rootPath}/logs`;

// const logger = pino({ level: config.logLevel });
const logger = pino();

/*
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};
*/

logger.exitHandler = pino.final(logger, (err, finalLogger, evt) => {
  finalLogger.info(`${evt} caught`);
  if (err) finalLogger.error(err, "error caused exit");
  finalLogger.warn("exiting...");
});

module.exports = logger;
