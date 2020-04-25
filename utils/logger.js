const pino = require("pino");
const config = require("../config");
const path = require("path");

const logsDir = `${config.rootPath}/logs`;

const logger = pino({
  prettyPrint: {
    colorize: true,
  },
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
