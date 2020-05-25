const db = require("./index");
const schemaHelper = require("./schemaHelper");
const logger = require("../utils/logger");

function GenericDb(schema) {
  this.getAll = async (options = {}) => {
    let { allColumns, keyColumn, table, queryColumns } = schema;

    if (options.denormalized && options.denormalized === 1) {
      table = schema.denormalizedView;
      allColumns = schema.denormalizedColumns;
    }

    logger.info(allColumns, "allColumns");
    logger.info(options.fields, "fields");

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

    const { insertSchema, insertColumns } = schema;

    const [errors, objects] = schemaHelper.validate(
      options.items,
      insertSchema
    );

    if (errors.length > 0) {
      return { errors: errors };
    }

    logger.info(insertColumns, "insert columns");

    const cs = db.getColumnSet(insertColumns, schema);

    logger.info(cs, "IQ");

    const q = db.pgp.helpers.insert(objects, cs) + " RETURNING *";
    logger.info(q, "insert query");
    const addedObjects = await db.db.map(q, [], (a) => a);

    return {
      items: addedObjects,
    };
  };

  this.update = async (options) => {
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

    const cs = db.getColumnSet(updateColumns, schema);
    const q =
      db.pgp.helpers.update(objects, cs) +
      ` WHERE v."${keyColumn}" = t."${keyColumn}"`;
    const res = await db.db.none(q);
    logger.info(res, "update result");

    const ids = objects.map((d) => d.id);
    const updatedObjects = await db.getById(
      table,
      schema.allColumns,
      keyColumn,
      ids
    );

    // only-set property update
    // const obj = utils.keepKeys(e, updateColumns);
    // const columnsToUpdate = Object.keys(obj);

    return { items: updatedObjects, errors: errors };
  };

  this.delete = async (options) => {
    const { table, keyColumn } = schema;

    const q =
      "DELETE FROM ${_table:name} WHERE ${_keyColumn:name} IN (${ids:csv}) RETURNING *";
    const deletedObjects = await db.db.any(q, {
      _table: table,
      _keyColumn: keyColumn,
      ids: options.keys,
    });

    return deletedObjects;
  };

  this.softDelete = async (options) => {
    const { table, keyColumn } = schema;

    const q =
      "UPDATE ${_table:name} SET ${_statusColumn:name} = 2 WHERE ${_keyColumn:name} IN (${ids:csv}) RETURNING *";
    const deletedObjects = await db.db.any(q, {
      _table: table,
      _statusColumn: schemaHelper.statusColumn,
      _keyColumn: keyColumn,
      ids: options.keys,
    });

    return deletedObjects;
  };
}

module.exports = GenericDb;
