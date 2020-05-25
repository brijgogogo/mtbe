const config = require("../config");
const logger = require("../utils/logger");
const utils = require("../utils");
const schemaHelper = require("./schemaHelper");
const initOptions = {
  capSQL: true,
  query(e) {
    logger.info(e.query, "QUERY:");
  },
  error(err, e) {
    if (e.cn) {
      // this is a connection-related error
      // cn = safe connection details passed into the library:
      //      if password is present, it is masked by #
    }

    if (e.query) {
      // query string is available
      if (e.params) {
        // query parameters are available
      }
    }

    if (e.ctx) {
      // occurred inside a task or transaction
    }
  },
  connect(client, dc, useCount) {
    const cp = client.connectionParameters;
    logger.info("Connected to database:", cp.database);
  },
  disconnect(client, dc) {
    const cp = client.connectionParameters;
    logger.info("Disconnecting from database:", cp.database);
  },
};
const pgp = require("pg-promise")(initOptions);
// pgp.pg.types.setTypeParser(20, BigInt); // Type Id 20 = BIGINT | BIGSERIAL
const monitor = require("pg-monitor");
monitor.attach(initOptions);

monitor.setLog((msg, info) => {
  logger.info(msg, "MSG");
});

const db = pgp(config.databaseConfig.connectionString);

module.exports = {
  db: db,
  pgp: pgp,

  getById: async function (table, selectColumns, keyColumn, ids) {
    const idValues = ids.map((a) => pgp.as.text(a) + "::bigint").join();

    return await db.query(
      "select ${selectColumns:name} from ${table:name} WHERE ${keyColumn:name} IN (${ids:raw})",
      {
        ids: idValues,
        selectColumns: selectColumns,
        table: table,
        keyColumn: keyColumn,
      }
    );
  },

  getQueryResults: async function (query) {
    const {
      allColumns,
      keyColumn,
      options,
      selectColumns,
      table,
      queryColumns,
    } = query;
    const offset = options.offset ? parseInt(options.offset) : 0;
    const limit = options.limit ? parseInt(options.limit) : "NULL";
    const sortBy =
      options.sortBy && allColumns.includes(options.sortBy)
        ? options.sortBy
        : keyColumn;
    const sortDirection = options.sortDirection ? options.sortDirection : "ASC";

    const hasOptionsConditions = Object.keys(options.conditions).length > 0;
    const conditions = utils.keepKeys(options.conditions, allColumns);
    const hasConditions = Object.keys(conditions).length > 0;

    if (hasOptionsConditions && !hasConditions) {
      logger.warn(options.conditions, "Invalid query");
      throw new Error(`Invalid query`);
    }

    let where = null;
    let whereObj = null;

    if (options.query && queryColumns && queryColumns.length > 0) {
      where = queryColumns
        .map((x) => `"${x}" ILIKE '${"%" + options.query + "%"}'`)
        .join(" OR ");
    } else if (hasConditions) {
      where = Object.entries(conditions)
        .map(([k, v]) => '"' + k + '" = ${' + k + "}")
        .join(" AND ");
      whereObj = conditions;
    }

    let queryParams = {
      _columns: selectColumns,
      _countColumn: schemaHelper.fullCountColumn,
      _table: table,
      _where: where,
      _statusColumn: schemaHelper.statusColumn,
      _sortBy: sortBy,
      _sortDirection: sortDirection,
      _limit: limit,
      _offset: offset,
    };

    let q =
      "SELECT ${_columns:name}, count(*) OVER() AS ${_countColumn:name} FROM ${_table:name} WHERE ";
    if (where !== null) {
      q += where + " AND ";
    }

    if (whereObj != null) {
      queryParams = {
        ...queryParams,
        ...whereObj,
      };
    }

    q +=
      '"state" != 2 ORDER BY ${_sortBy:name} ${_sortDirection:raw} LIMIT ${_limit:raw} OFFSET ${_offset:raw}';

    const results = await db.query(q, queryParams);

    let totalCount = 0;

    if (results.length > 0) {
      totalCount = results[0][schemaHelper.fullCountColumn];

      for (let i = 0; i < results.length; i++) {
        delete results[i][schemaHelper.fullCountColumn];
      }
    }

    const result = {
      items: results,
      totalCount: totalCount,
    };

    return result;
  },

  getColumnSet: function (columns, schema) {
    const cs = [];

    logger.info(columns, "cols");
    logger.info(schema, "sch");

    columns.forEach((c) => {
      logger.info(c, "colName");
      const res = { name: c };
      if (schemaHelper.isDateType(schema.schema[c])) {
        res.cast = "date";
      }
      if (schemaHelper.isOptionalType(schema.schema[c])) {
        res.def = null;
      }
      cs.push(res);
    });

    return new pgp.helpers.ColumnSet(cs, { table: schema.table });
  },
};
