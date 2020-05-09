const db = require("./index");
const schemaHelper = require("./schemaHelper");
const utils = require("../utils");
const logger = require("../utils/logger");

const sql = db.sql;

function GenericDb(schema) {
  this.getAll = async (options = {}) => {
    const { allColumns, keyColumn, table, queryColumns } = schema;

    let selectColumns = schemaHelper.getSelectColumns(
      allColumns,
      options.fields
    );

    if (selectColumns.length == 0) {
      return { error: "Invalid projection!" };
    }

    if (options.ids) {
      return db.getById(table, selectColumns, keyColumn, options.ids);
    }

    return db.getQueryResults({
      allColumns: allColumns,
      keyColumn: keyColumn,
      options: options,
      selectColumns: selectColumns,
      table: table,
      queryColumns: queryColumns,
    });
  };

  this.add = async (options) => {
    options.items.forEach((e) => {
      schemaHelper.setAddInfo(e, options.userId);
    });

    const { insertSchema, table, insertColumns } = schema;

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
  };

  this.update = async (options) => {
    const updatedObjects = [];

    options.items.forEach((e) => {
      schemaHelper.setUpdateInfo(e, options.userId);
    });

    const { updateSchema, table, updateColumns, keyColumn } = schema;

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

        for (let i = 0; i < result.count; i++) {
          updatedObjects.push(result[i]);
        }
      } catch (error) {
        errors.push({
          item: e,
          error: "Update failure",
        });

        logger.error(error, "Update failure");
      }
    }

    return { items: updatedObjects, errors: errors };
  };

  this.delete = async (options) => {
    const deletedObjects = [];
    const { table, keyColumn } = schema;

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
  };
}

module.exports = GenericDb;

