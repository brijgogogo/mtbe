require("dotenv").config({ debug: process.env.DEBUG });
const path = require("path");

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  databaseConfig: {
    connectionString: process.env.DATABASE_URL,
  },
  rootPath: path.resolve(__dirname),
  whitelist: (process.env.CORS_WHITELIST || "http://localhost:3000").split(","),
};
