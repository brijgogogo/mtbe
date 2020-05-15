const logger = require("./logger");

const exitActions = [];
const exceptionActions = [];

let cleaning = false;

function cleanup(err, evt) {
  if (!cleaning) {
    cleaning = true;
    exitActions.forEach((x) => {
      x(err, evt);
    });

    logger.exitHandler(err, evt);
    process.exit(err ? 1 : 0);
  }
}

// catch all the ways node might exit
process.on("warning", (e) => logger.warn(e));
process.on("beforeExit", () => cleanup(null, "beforeExit"));
process.on("exit", () => cleanup(null, "exit"));
process.on("SIGINT", () => cleanup(null, "SIGINT"));
process.on("SIGQUIT", () => cleanup(null, "SIGQUIT"));
process.on("SIGTERM", () => cleanup(null, "SIGTERM"));
process.on("SIGUSR2", () => cleanup(null, "SIGUSR2"));
process.on("uncaughtException", (err) => cleanup(err));
process.on("unhandledRejection", (err) => cleanup(err));

const processHelper = {
  onExit: function (callback) {
    exitActions.push(callback);
  },
  onException: function (callback) {
    exceptionActions.push(callback);
  },
};

module.exports = processHelper;
