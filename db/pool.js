const { Pool } = require("pg");

// environment variable: DATABASE_URL=postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
// const databaseConfig = { connectionString: process.env.DATABASE_URL };
const databaseConfig = {
  host: "localhost",
  port: 5432,
  database: "mtdb",
  user: "mtbu",
  password: "mtbu@1212",
};

const pool = new Pool(databaseConfig);

pool.on("conneect", () => {
  console.log("connected to the db");
});

pool.on("error", (err, client) => {
  console.error("Unexpected error in idle client", err);
});

module.exports = {
  pool: pool,
};
