const { Pool } = require("pg");
const config = require("../config");

/*
const databaseConfig = {
  host: "localhost",
  port: 5432,
  database: "mtdb",
  user: "mtbu",
  password: "mtbu@1212",
};
*/

const pool = new Pool(config.databaseConfig);

pool.on("conneect", () => {
  console.log("connected to the db");
});

pool.on("error", (err, client) => {
  console.error("Unexpected error in idle client", err);
});

pool.on("remove", () => {
  console.log("client removed");
  // process.exit(0);
});

module.exports = {
  pool: pool,
};
