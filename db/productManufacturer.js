const sql = require("./index");
const dbConstants = require("./dbConstants");
const utils = require("../utils");
const logger = require("../utils/logger");
// const _ = require("lodash");

const columns = ["id", "name", "website_url"].concat(dbConstants.metaColumns);
const insertColumns = columns.slice(1);
const table = "product_manufacturer";
const fullCountColumn = "_full_count";

module.exports = {
  getAll: async (options = {}) => {
    try {
      let productManufacturers;
      let selectColumns = columns;

      if (options.fields) {
        selectColumns = utils.filterKeys(options.fields, columns);
      }

      if (options.ids) {
        productManufacturers = await sql`
          select ${sql(selectColumns)} from ${sql(table)}
          where id in ( ${options.ids} )
          `;

        return productManufacturers;
      }

      const params = [];
      const offset = options.offset ? parseInt(options.offset) : 0;
      const limit = options.limit ? parseInt(options.limit) : "NULL";
      const sortBy =
        options.sortBy && columns.includes(options.sortBy)
          ? options.sortBy
          : "id";
      const sortDirection = options.sortDirection
        ? options.sortDirection
        : "ASC";

      const hasOptionsConditions = Object.keys(options.conditions).length > 0;
      const conditions = utils.filterKeys(options.conditions, columns);
      const hasConditions = Object.keys(conditions).length > 0;

      if (hasOptionsConditions && !hasConditions) {
        logger.warn(options.conditions, "Invalid query");
        throw new Error(`Invalid query`);
      }

      let where;

      if (options.query) {
        where = `name ILIKE '${"%" + options.query + "%"}'`;
      } else if (hasConditions) {
        where = Object.entries(conditions)
          .map(([k, v]) => k + " = " + "$" + params.push(v))
          .join(" AND ");
      } else {
        where = "1 = 1";
      }

      productManufacturers = await sql.unsafe(
        `
        SELECT ${selectColumns.join(",")}, count(*) OVER() AS ${fullCountColumn}
        from ${table} where ${where}
        ORDER BY ${sortBy} ${sortDirection}
        LIMIT ${limit} OFFSET ${offset}
      `,
        params
      );

      let totalCount = 0;

      if (productManufacturers.length > 0) {
        logger.info(productManufacturers[0]);
        totalCount = productManufacturers[0][fullCountColumn];

        // const items = [];

        for (let i = 0; i < productManufacturers.length; i++) {
          delete productManufacturers[i][fullCountColumn];
          logger.info(productManufacturers[i]);
          // items.push(obj);
        }

        // productManufacturers = items;
      }

      const result = {
        items: productManufacturers,
        totalCount: totalCount,
      };

      return result;
    } catch (error) {
      logger.error(error);
    }
  },
  add: async (options) => {
    const addedObjects = await sql`
      INSERT INTO ${sql(table)}
      ${sql(options.object, insertColumns)}
      RETURNING id
      `;
    return addedObjects;
  },
};
