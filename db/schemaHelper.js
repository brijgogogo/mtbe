const utils = require("../utils");
const logger = require("../utils/logger");

const schemaHelper = {
  dataTypes: {
    number: "number",
    numberOptional: "number?",
    string: "string",
    stringOptional: "string?",
    bool: "boolean",
    boolOptional: "boolean?",
    date: "date",
    dateOptional: "date?",
  },
  fullCountColumn: "_full_count",
  createdByColumn: "created_by",
  createdDateColumn: "created_date",
  modifiedByColumn: "modified_by",
  modifiedDateColumn: "modified_date",
  sourceColumn: "source",
  statusColumn: "status",
};

schemaHelper.metaColumns = [
  schemaHelper.createdByColumn,
  schemaHelper.createdDateColumn,
  schemaHelper.modifiedByColumn,
  schemaHelper.modifiedDateColumn,
  schemaHelper.sourceColumn,
  schemaHelper.statusColumn,
];

schemaHelper.insertMetaColumns = [
  schemaHelper.createdByColumn,
  schemaHelper.createdDateColumn,
  schemaHelper.sourceColumn,
  schemaHelper.statusColumn,
];

schemaHelper.updateMetaColumns = [
  schemaHelper.modifiedByColumn,
  schemaHelper.modifiedDateColumn,
  schemaHelper.statusColumn,
];

schemaHelper.metaColumnsSchema = {
  [schemaHelper.createdByColumn]: schemaHelper.dataTypes.numberOptional,
  [schemaHelper.createdDateColumn]: schemaHelper.dataTypes.dateOptional,
  [schemaHelper.modifiedByColumn]: schemaHelper.dataTypes.numberOptional,
  [schemaHelper.modifiedDateColumn]: schemaHelper.dataTypes.dateOptional,
  [schemaHelper.sourceColumn]: schemaHelper.dataTypes.stringOptional,
  [schemaHelper.statusColumn]: schemaHelper.dataTypes.numberOptional,
};

schemaHelper.insertMetaColumnsSchema = utils.keepKeys(
  schemaHelper.metaColumnsSchema,
  [
    schemaHelper.createdByColumn,
    schemaHelper.createdDateColumn,
    schemaHelper.sourceColumn,
    schemaHelper.statusColumn,
  ]
);

schemaHelper.metaColumnsSchemaDefaults = { [schemaHelper.statusColumn]: true };

schemaHelper.insertMetaColumnsSchemaDefaults = utils.keepKeys(
  schemaHelper.metaColumnsSchemaDefaults,
  [schemaHelper.statusColumn]
);

schemaHelper.updateMetaColumnsSchema = utils.keepKeys(
  schemaHelper.metaColumnsSchema,
  [
    schemaHelper.modifiedByColumn,
    schemaHelper.modifiedDateColumn,
    schemaHelper.sourceColumn,
    schemaHelper.statusColumn,
  ]
);

schemaHelper.setAddInfo = function (obj, userId) {
  obj[this.createdDateColumn] = new Date();
  obj[this.createdByColumn] = userId;
  obj[this.statusColumn] = obj[this.statusColumn] || 1;

  /*
    columns.forEach((e) => {
      obj[e] = obj[e] || null;
    });
    */
};

schemaHelper.setUpdateInfo = function (obj, userId) {
  obj[this.modifiedDateColumn] = new Date();
  obj[this.modifiedByColumn] = userId;
};

schemaHelper.toValidationError = function (error) {
  const validationError = {
    item: Array.isArray(error.branch) ? error.branch[0] : error.branch, // object validated
    errors: {},
  };

  error.failures.forEach((e) => {
    const key = e.path[0];
    const value = e.value;
    const type = e.type;

    if (value === undefined) {
      validationError.errors[key] = "required";
    } else if (type === undefined) {
      validationError.errors[key] = "unknown attribute";
    } else {
      validationError.errors[key] = "invalid";
    }
  });

  return validationError;
};
schemaHelper.validate = function (objects, schema) {
  const goodObjects = [];
  const errors = [];

  objects.forEach((e) => {
    // logger.info(e, "object");
    //logger.info({}, typeof e);
    logger.info(Array.isArray(e), "IsArray");
    const [err, result] = schema.validate(e);

    if (err) {
      // logger.error(err, err.toString());
      logger.error(err.toString());
      errors.push(this.toValidationError(err));
    } else {
      goodObjects.push(result);
    }
  });

  return [errors, goodObjects];
};

schemaHelper.getSelectColumns = function (allColumns, requestedColumns) {
  let selectColumns = allColumns;

  if (requestedColumns) {
    selectColumns = utils.keepValues(requestedColumns, allColumns);
  }

  return selectColumns;
};

module.exports = schemaHelper;
