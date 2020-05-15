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
  // logLevel: process.env.LOG_LEVEL || "info",
  mailConfig: {
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE == "1",
    auth: {
      user: process.env.MAIL_USER_ID,
      pass: process.env.MAIL_PWD,
    },
  },
};
