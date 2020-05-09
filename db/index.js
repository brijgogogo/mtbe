const config = require("../config");
const postgres = require("postgres");
const logger = require("../utils/logger");
const utils = require("../utils");
const schemaHelper = require("./schemaHelper");

const sql = postgres(config.databaseConfig.connectionString, {
  debug: (con, query, params) => {
    logger.info(`query: ${query}
      params: ${params}`);
  },
});

module.exports = {
  sql: sql,
  getById: async function (table, selectColumns, keyColumn, ids) {
    return await sql`
          select ${sql(selectColumns)} from ${sql(table)}
          where ${sql(keyColumn)} in ( ${ids} )
          `;
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
    const params = [];
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

    let where = "1 = 1";

    if (options.query && queryColumns && queryColumns.length > 0) {
      where = queryColumns
        .map((x) => `${x} ILIKE '${"%" + options.query + "%"}'`)
        .join(" OR ");
    } else if (hasConditions) {
      where = Object.entries(conditions)
        .map(([k, v]) => k + " = " + "$" + params.push(v))
        .join(" AND ");
    }

    const results = await sql.unsafe(
      `
        SELECT ${selectColumns.join(",")}, count(*) OVER() AS ${
        schemaHelper.fullCountColumn
      }
        from ${table} where ${where}
        ORDER BY ${sortBy} ${sortDirection}
        LIMIT ${limit} OFFSET ${offset}
      `,
      params
    );

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
};
