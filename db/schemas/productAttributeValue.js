const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "productAttrValue",
  keyColumn: "id",
  productIdColumn: "productId",
  attrValueIdColumn: "attrValueId",
  descriptionColumn: "description",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.productIdColumn,
  typeSchema.attrValueIdColumn,
  typeSchema.descriptionColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = []; //todo: query against view columns?

typeSchema.insertColumns = [
  typeSchema.productIdColumn,
  typeSchema.attrValueIdColumn,
  typeSchema.descriptionColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.productIdColumn,
  typeSchema.attrValueIdColumn,
  typeSchema.descriptionColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.productIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.attrValueIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.descriptionColumn]: schemaHelper.dataTypes.stringOptional,
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
  typeSchema.attrValueIdColumn + schemaHelper.viewSuffix;

typeSchema.denormalizedColumns = typeSchema.allColumns
  .concat([
    typeSchema.productIdNameColumn,
    typeSchema.attributeValueIdNameColumn,
  ])
  .concat(schemaHelper.denormalizedMetaColumns);

module.exports = typeSchema;
