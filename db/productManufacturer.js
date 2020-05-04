const sql = require("./index");
const schemaHelper = require("./schemaHelper");
const utils = require("../utils");
const logger = require("../utils/logger");
// const _ = require("lodash");
const superstruct = require("superstruct");

const keyColumn = "id";
const nameColumn = "name";
const websiteUrlColumn = "website_url";
const columns = [keyColumn, nameColumn, websiteUrlColumn].concat(
  schemaHelper.metaColumns()
);
const insertColumns = utils.removeValues(
  columns,
  keyColumn,
  schemaHelper.modifiedByColumn,
  schemaHelper.modifiedDateColumn
);
const updateColumns = utils.removeValues(
  columns,
  keyColumn,
  schemaHelper.createdByColumn,
  schemaHelper.createdDateColumn,
  schemaHelper.sourceColumn
);
const table = "product_manufacturer";

const schema = {
  [keyColumn]: schemaHelper.dataTypes.number,
  [nameColumn]: schemaHelper.dataTypes.string,
  [websiteUrlColumn]: schemaHelper.dataTypes.stringOptional,
};

const insertSchema = superstruct.struct(
  {
    ...utils.keepKeys(schema, [nameColumn, websiteUrlColumn]),
    ...schemaHelper.insertMetaColumnsSchema(),
  },
  schemaHelper.insertMetaColumnsSchemaDefaults()
);

const updateSchema = superstruct.struct(
  {
    ...schema,
    ...schemaHelper.updateMetaColumnsSchema(),
  },
  {}
);

module.exports = {
  getAll: async (options = {}) => {
    try {
      let productManufacturers;
      let selectColumns = columns;

      if (options.fields) {
        selectColumns = utils.keepKeys(options.fields, columns);
      }

      if (options.ids) {
        productManufacturers = await sql`
          select ${sql(selectColumns)} from ${sql(table)}
          where ${sql(keyColumn)} in ( ${options.ids} )
          `;

        return productManufacturers;
      }

      const params = [];
      const offset = options.offset ? parseInt(options.offset) : 0;
      const limit = options.limit ? parseInt(options.limit) : "NULL";
      const sortBy =
        options.sortBy && columns.includes(options.sortBy)
          ? options.sortBy
          : keyColumn;
      const sortDirection = options.sortDirection
        ? options.sortDirection
        : "ASC";

      const hasOptionsConditions = Object.keys(options.conditions).length > 0;
      const conditions = utils.keepKeys(options.conditions, columns);
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

      if (productManufacturers.length > 0) {
        totalCount = productManufacturers[0][schemaHelper.fullCountColumn];

        // const items = [];

        for (let i = 0; i < productManufacturers.length; i++) {
          delete productManufacturers[i][schemaHelper.fullCountColumn];
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
      throw error;
    }
  },
  add: async (options) => {
    options.items.forEach((e) => {
      schemaHelper.setAddInfo(e, options.userId);
    });

    const [errors, objects] = schemaHelper.validate(
      options.items,
      insertSchema
    );

    if (errors.length > 0) {
      return { errors: errors };
    }

    const addedObjects = await sql`
      INSERT INTO ${sql(table)}
      ${sql(objects, ...insertColumns)}
      RETURNING *
      `;

    return {
      items: addedObjects,
    };
  },

  update: async (options) => {
    const updatedObjects = [];

    options.items.forEach((e) => {
      schemaHelper.setUpdateInfo(e, options.userId);
    });

    const [errors, objects] = schemaHelper.validate(
      options.items,
      updateSchema
    );

    if (errors.length > 0) {
      return { errors: errors };
    }

    for (let i = 0; i < objects.length; i++) {
      const e = objects[i];

      try {
        const obj = utils.keepKeys(e, updateColumns);
        const columnsToUpdate = Object.keys(obj);

        const result = await sql`
        UPDATE ${sql(table)} SET
        ${sql(e, ...columnsToUpdate)}
        WHERE ${sql(keyColumn)} = ${e.id}
        RETURNING *
        `;

        updatedObjects.push(result);
      } catch (error) {
        updatedObjects.push({
          item: e,
          error: "Update failure",
        });

        logger.error(error, "Update failure");
      }
    }

    return updatedObjects;
  },

  delete: async (options) => {
    const deletedObjects = [];

    for (let i = 0; i < options.keys.length; i++) {
      const k = options.keys[i];
      const id = parseInt(k);
      const result = await sql`
        DELETE FROM ${sql(table)}
        WHERE ${sql(keyColumn)} = ${id}
        RETURNING *
      `;

      logger.info(result.count, result.command);
      if (result.count > 0) {
        deletedObjects.push(result[0]);
      }
    }

    return deletedObjects;
  },
};
