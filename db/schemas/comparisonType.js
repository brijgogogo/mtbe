// const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "comparisonType",
  keyColumn: "id",
  nameColumn: "name",
  descriptionColumn: "description",
  keyColumn1: "key",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.keyColumn1,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = [
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.keyColumn1,
];

typeSchema.insertColumns = [
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.keyColumn1,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.keyColumn1,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.nameColumn]: schemaHelper.dataTypes.nonEmptyString,
    [typeSchema.descriptionColumn]: schemaHelper.dataTypes.string,
    [typeSchema.keyColumn1]: schemaHelper.dataTypes.string,
  },
  ...schemaHelper.metaColumnsSchema,
};

//typeSchema.insertSchema = superstruct.struct(
typeSchema.insertSchema = schemaHelper.struct(
  utils.keepKeys(typeSchema.schema, typeSchema.insertColumns),
  schemaHelper.insertMetaColumnsSchemaDefaults
);

// typeSchema.updateSchema = superstruct.struct(
typeSchema.updateSchema = schemaHelper.struct(
  utils.keepKeys(typeSchema.schema, typeSchema.updateColumns)
);

module.exports = typeSchema;
