const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "attribute",
  keyColumn: "id",
  nameColumn: "name",
  descriptionColumn: "description",
  displayNameColumn: "display_name",
  dataTypeColumn: "data_type",
  unitTypeColumn: "unit_type",
  attributeIdColumn: "attribute_id", // todo: rename parent_attribute_id ?
  comparisonTypeColumn: "comparison_type",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.displayNameColumn,
  typeSchema.dataTypeColumn,
  typeSchema.unitTypeColumn,
  typeSchema.attributeIdColumn,
  typeSchema.comparisonTypeColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = [
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.displayNameColumn,
];

typeSchema.insertColumns = [
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.displayNameColumn,
  typeSchema.dataTypeColumn,
  typeSchema.unitTypeColumn,
  typeSchema.attributeIdColumn,
  typeSchema.comparisonTypeColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.displayNameColumn,
  typeSchema.dataTypeColumn,
  typeSchema.unitTypeColumn,
  typeSchema.attributeIdColumn,
  typeSchema.comparisonTypeColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.nameColumn]: schemaHelper.dataTypes.string,
    [typeSchema.descriptionColumn]: schemaHelper.dataTypes.stringOptional,
    [typeSchema.displayNameColumn]: schemaHelper.dataTypes.string,
    [typeSchema.dataTypeColumn]: schemaHelper.dataTypes.number,
    [typeSchema.unitTypeColumn]: schemaHelper.dataTypes.stringOptional,
    [typeSchema.attributeIdColumn]: schemaHelper.dataTypes.numberOptional,
    [typeSchema.comparisonTypeColumn]: schemaHelper.dataTypes.stringOptional,
  },
  ...schemaHelper.metaColumnsSchema,
};

typeSchema.insertSchema = superstruct.struct(
  utils.keepKeys(typeSchema.schema, typeSchema.insertColumns),
  schemaHelper.insertMetaColumnsSchemaDefaults
);

typeSchema.updateSchema = superstruct.struct(
  utils.keepKeys(typeSchema.schema, typeSchema.updateColumns)
);

module.exports = typeSchema;
