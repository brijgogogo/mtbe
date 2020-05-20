const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "product_attribute_value",
  keyColumn: "id",
  productIdColumn: "product_id",
  attributeValueIdColumn: "attribute_value_id",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.productIdColumn,
  typeSchema.attributeValueIdColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = []; //todo: query against view columns?

typeSchema.insertColumns = [
  typeSchema.productIdColumn,
  typeSchema.attributeValueIdColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.productIdColumn,
  typeSchema.attributeValueIdColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.productIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.attributeValueIdColumn]: schemaHelper.dataTypes.number,
  },
  ...schemaHelper.metaColumnsSchema,
};

typeSchema.insertSchema = schemaHelper.struct(
  utils.keepKeys(typeSchema.schema, typeSchema.insertColumns),
  schemaHelper.insertMetaColumnsSchemaDefaults
);

typeSchema.updateSchema = schemaHelper.struct(
  utils.keepKeys(typeSchema.schema, typeSchema.updateColumns)
);

typeSchema.denormalizedView = typeSchema.table + schemaHelper.viewSuffix;
typeSchema.productIdNameColumn =
  typeSchema.productIdColumn + schemaHelper.viewSuffix;
typeSchema.attributeValueIdNameColumn =
  typeSchema.attributeValueIdColumn + schemaHelper.viewSuffix;

typeSchema.denormalizedColumns = typeSchema.allColumns
  .concat([
    typeSchema.productIdNameColumn,
    typeSchema.attributeValueIdNameColumn,
  ])
  .concat(schemaHelper.denormalizedMetaColumns);

module.exports = typeSchema;
