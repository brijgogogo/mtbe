const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "product",
  keyColumn: "id",
  nameColumn: "name",
  productCodeColumn: "code",
  descriptionColumn: "description",
  imagesDirColumn: "imagesDir",
  launchDateColumn: "launchDate",
  isLaunchedColumn: "isLaunched",
  productTypeIdColumn: "productTypeId",
  productManufacturerIdColumn: "productManufacturerId",
  baseProductIdColumn: "baseProductId",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.codeColumn,
  typeSchema.descriptionColumn,
  typeSchema.imagesDirColumn,
  typeSchema.launchDateColumn,
  typeSchema.isLaunchedColumn,
  typeSchema.productTypeIdColumn,
  typeSchema.productManufacturerIdColumn,
  typeSchema.baseProductIdColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = [
  typeSchema.nameColumn,
  typeSchema.descriptionColumn,
  typeSchema.codeColumn,
];

typeSchema.insertColumns = [
  typeSchema.nameColumn,
  typeSchema.productCodeColumn,
  typeSchema.descriptionColumn,
  typeSchema.imagesDirColumn,
  typeSchema.launchDateColumn,
  typeSchema.isLaunchedColumn,
  typeSchema.productTypeIdColumn,
  typeSchema.productManufacturerIdColumn,
  typeSchema.baseProductIdColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.productCodeColumn,
  typeSchema.descriptionColumn,
  typeSchema.imagesDirColumn,
  typeSchema.launchDateColumn,
  typeSchema.isLaunchedColumn,
  typeSchema.productTypeIdColumn,
  typeSchema.productManufacturerIdColumn,
  typeSchema.baseProductIdColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.nameColumn]: schemaHelper.dataTypes.string,
    [typeSchema.productCodeColumn]: schemaHelper.dataTypes.stringOptional,
    [typeSchema.descriptionColumn]: schemaHelper.dataTypes.stringOptional,
    [typeSchema.imagesDirColumn]: schemaHelper.dataTypes.stringOptional,
    [typeSchema.launchDateColumn]: schemaHelper.dataTypes.dateOptional,
    [typeSchema.isLaunchedColumn]: schemaHelper.dataTypes.boolOptional,
    [typeSchema.productTypeIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.productManufacturerIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.baseProductIdColumn]: schemaHelper.dataTypes.numberOptional,
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
typeSchema.productManufacturerIdNameColumn =
  typeSchema.productManufacturerIdColumn + schemaHelper.viewSuffix;
typeSchema.baseProductIdNameColumn =
  typeSchema.baseProductIdColumn + schemaHelper.viewSuffix;

typeSchema.denormalizedColumns = typeSchema.allColumns
  .concat([
    typeSchema.productTypeIdNameColumn,
    typeSchema.productManufacturerIdNameColumn,
    typeSchema.baseProductIdNameColumn,
  ])
  .concat(schemaHelper.denormalizedMetaColumns);

module.exports = typeSchema;
