const pool = require("./pool").pool;

module.exports = {
  query: async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  },
  getClient: async () => {
    const client = await pool.connect();
    const query = client.query;
    client.query = async (...args) => {
      client.lastQuery = args;
      return query.apply(client, args);
    };

    const timeout = setTimeout(() => {
      console.error("A client has been checked out for more than 5 seconds!");
      console.error(
        `The last executed query on this client was: ${client.lastQuery}`
      );
    }, 5000);

    const release = client.release;
    client.release = () => {
      clearTimeout(timeout);
      client.release = release;
    };

    return client;
  },
};

/*
module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();

    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log("executed query", { text, duration, rows: res.rowCount });
      callback(err, res);
    });
  },

  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query;
      client.query = (...args) => {
        client.lastQuery = args;
        return query.apply(client, args);
      };

      const timeout = setTimeout(() => {
        console.error("A client has been checked out for more than 5 seconds!");
        console.error(
          `The last executed query on this client was: ${client.lastQuery}`
        );
      }, 5000);

      const release = (err) => {
        done(err);
        clearTimeout(timeout);
        client.query = query;
      };

      callback(err, client, release);
    });
  },
};
/*

/*const { Client } = require("pg");
const client = new Client();

await client.connect();

const res = await client.query("SELECT $1::text as message", ["Hello world!"]);
console.log(res.rows[0].message);
await client.end();
*/
