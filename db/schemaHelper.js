const utils = require("../utils");
const logger = require("../utils/logger");
const { superstruct, struct } = require("superstruct");

const customStruct = superstruct({
  types: {
    notEmpty: (v) => v.length > 0,
  },
});

const dataTypes = {
  number: "number",
  numberOptional: "number?",
  numberOptionalOrNull: "number? | null",
  string: "string",
  stringOptional: "string?",
  stringOptionalOrNull: "string? | null",
  // nonEmptyString: customStruct.intersection(["string", "notEmpty"]),
  nonEmptyString: "string & notEmpty",
  /*  nonEmptyString: customStruct.intersection([
    "string",
    function (v) {
      if (v.length == 0)
        return {
          failures: [
            {
              type: "empty string",
            },
          ],
        };
    },
  ]),
  */
  nonEmtpyStringOptionalOrNull: "(string? & notEmpty) | null", // todo: test
  bool: "boolean",
  boolOptional: "boolean?",
  date: "date",
  dateOptional: "date?",
};

function isOptionalType(dataType) {
  return (
    dataType === dataTypes.numberOptional ||
    dataType === dataTypes.numberOptionalOrNull ||
    dataType === dataTypes.stringOptional ||
    dataType === dataTypes.stringOptionalOrNull ||
    dataType === dataTypes.nonEmtpyStringOptionalOrNull ||
    dataType === dataTypes.boolOptional ||
    dataType === dataTypes.dateOptional
  );
}

function isDateType(dataType) {
  return dataType === dataTypes.date || dataType === dataTypes.dateOptional;
}

function isString(value) {
  return typeof value === "string";
}

const getErrorDesc = (errorType, value) => {
  if (value === undefined) {
    return "Value required";
  } else if (errorType === undefined) {
    return "Unknown attribute";
  } else if (errorType === null) {
    return "Invalid value";
  }

  switch (errorType) {
    case dataTypes.string:
    case dataTypes.number:
    case dataTypes.bool:
      return "Value required";
    case dataTypes.nonEmptyString:
      if (isString(value) && value.length == 0) {
        return "Invalid empty value";
      }
  }

  return "Invalid value";
};

const schemaHelper = {
  struct: customStruct,
  dataTypes: dataTypes,
  fullCountColumn: "_full_count",
  createdByColumn: "crtBy",
  createdDateColumn: "crtAt",
  modifiedByColumn: "modBy",
  modifiedDateColumn: "modAt",
  sourceColumn: "source",
  statusColumn: "state",
  viewSuffix: "_v",
  isDateType: isDateType,
  isOptionalType: isOptionalType,
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

schemaHelper.createdByNameColumn =
  schemaHelper.createdByColumn + schemaHelper.viewSuffix;
schemaHelper.modifiedByNameColumn =
  schemaHelper.modifiedByColumn + schemaHelper.viewSuffix;

// logger.info(schemaHelper.createdByNameColumn, "n");

schemaHelper.denormalizedMetaColumns = [
  schemaHelper.createdByNameColumn,
  schemaHelper.modifiedByNameColumn,
];

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

    // validationError.errors[key] = "invalid";
    validationError.errors[key] = getErrorDesc(type, value);
  });

  return validationError;
};
schemaHelper.validate = function (objects, schema) {
  const goodObjects = [];
  const errors = [];

  objects.forEach((e) => {
    // logger.info(e, "object");
    //logger.info({}, typeof e);
    // logger.info(Array.isArray(e), "IsArray");
    const [err, result] = schema.validate(e);

    if (err) {
      logger.error(err, err.toString());
      // logger.error(err.toString());
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
