require("dotenv").config({ debug: process.env.DEBUG });

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  databaseConfig: {
    connectionString: process.env.DATABASE_URL,
  },
};
