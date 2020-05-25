// const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "attr",
  keyColumn: "id",
  nameColumn: "name",
  descriptionColumn: "description",
  displayNameColumn: "displayText",
  dataTypeColumn: "dataType",
  unitTypeColumn: "unitType",
  attributeIdColumn: "baseAttrId",
  comparisonTypeColumn: "comparisonType",
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
    [typeSchema.nameColumn]: schemaHelper.dataTypes.nonEmptyString,
    [typeSchema.descriptionColumn]: schemaHelper.dataTypes.string,
    [typeSchema.displayNameColumn]: schemaHelper.dataTypes.string,
    [typeSchema.dataTypeColumn]: schemaHelper.dataTypes.numberOptionalOrNull,
    [typeSchema.unitTypeColumn]: schemaHelper.dataTypes.stringOptionalOrNull,
    [typeSchema.attributeIdColumn]: schemaHelper.dataTypes.numberOptionalOrNull,
    [typeSchema.comparisonTypeColumn]:
      schemaHelper.dataTypes.stringOptionalOrNull,
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

typeSchema.denormalizedView = typeSchema.table + schemaHelper.viewSuffix;
typeSchema.dataTypeNameColumn =
  typeSchema.dataTypeColumn + schemaHelper.viewSuffix;
typeSchema.unitTypeNameColumn =
  typeSchema.unitTypeColumn + schemaHelper.viewSuffix;
typeSchema.comparisonTypeNameColumn =
  typeSchema.comparisonTypeColumn + schemaHelper.viewSuffix;

typeSchema.denormalizedColumns = typeSchema.allColumns
  .concat([
    typeSchema.dataTypeNameColumn,
    typeSchema.unitTypeNameColumn,
    typeSchema.comparisonTypeNameColumn,
  ])
  .concat(schemaHelper.denormalizedMetaColumns);

module.exports = typeSchema;
