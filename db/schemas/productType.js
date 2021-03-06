const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "productType",
  keyColumn: "id",
  nameColumn: "name",
  descriptionColumn: "description",
  productTypeIdColumn: "productTypeId",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.productTypeIdColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = [typeSchema.nameColumn, typeSchema.descriptionColumn];

typeSchema.insertColumns = [
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.productTypeIdColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.productTypeIdColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.nameColumn]: schemaHelper.dataTypes.string,
    [typeSchema.descriptionColumn]: schemaHelper.dataTypes.stringOptional,
    [typeSchema.productTypeIdColumn]:
      schemaHelper.dataTypes.numberOptionalOrNull,
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

typeSchema.denormalizedView = typeSchema.table + schemaHelper.viewSuffix;
typeSchema.productTypeIdNameColumn =
  typeSchema.productTypeIdColumn + schemaHelper.viewSuffix;

typeSchema.denormalizedColumns = typeSchema.allColumns
  .concat([typeSchema.productTypeIdNameColumn])
  .concat(schemaHelper.denormalizedMetaColumns);

module.exports = typeSchema;
