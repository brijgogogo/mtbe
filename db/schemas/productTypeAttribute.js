const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "productTypeAttr",
  keyColumn: "id",
  productTypeIdColumn: "productTypeId",
  attributeIdColumn: "attrId",
  displayOrderColumn: "displayOrder",
  collapsibleColumn: "collapsible",
  tagsColumn: "tags",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.productTypeIdColumn,
  typeSchema.attributeIdColumn,
  typeSchema.displayOrderColumn,
  typeSchema.collapsibleColumn,
  typeSchema.tagsColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = [typeSchema.nameColumn, typeSchema.descriptionColumn];

typeSchema.insertColumns = [
  typeSchema.productTypeIdColumn,
  typeSchema.attributeIdColumn,
  typeSchema.displayOrderColumn,
  typeSchema.collapsibleColumn,
  typeSchema.tagsColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.productTypeIdColumn,
  typeSchema.attributeIdColumn,
  typeSchema.displayOrderColumn,
  typeSchema.collapsibleColumn,
  typeSchema.tagsColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.productTypeIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.attributeIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.displayOrderColumn]: schemaHelper.dataTypes.number,
    [typeSchema.collapsibleColumn]: schemaHelper.dataTypes.boolOptional,
    [typeSchema.tagsColumn]: schemaHelper.dataTypes.stringOptional,
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
typeSchema.attributeIdNameColumn =
  typeSchema.attributeIdColumn + schemaHelper.viewSuffix;

typeSchema.denormalizedColumns = typeSchema.allColumns
  .concat([
    typeSchema.productTypeIdNameColumn,
    typeSchema.attributeIdNameColumn,
  ])
  .concat(schemaHelper.denormalizedMetaColumns);

module.exports = typeSchema;
