const config = require("../config");
const postgres = require("postgres");
const logger = require("../utils/logger");

const sql = postgres(config.databaseConfig.connectionString, {
  debug: (con, query, params) => {
    logger.info(`query: ${query}
      params: ${params}`);
  },
});

module.exports = sql;
