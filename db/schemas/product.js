const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "product",
  keyColumn: "id",
  nameColumn: "name",
  productCodeColumn: "product_code",
  productTypeIdColumn: "product_type_id",
  productManufacturerIdColumn: "product_manufacturer_id",
  baseProductIdColumn: "base_product_id",
  descriptionColumn: "description",
  imagesDirColumn: "images_dir",
  rumouredDateColumn: "rumoured_date",
  launchDateColumn: "launch_date",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.productCodeColumn,
  typeSchema.productTypeIdColumn,
  typeSchema.productManufacturerIdColumn,
  typeSchema.baseProductIdColumn,
  typeSchema.descriptionColumn,
  typeSchema.imagesDirColumn,
  typeSchema.rumouredDateColumn,
  typeSchema.launchDateColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = [typeSchema.nameColumn, typeSchema.descriptionColumn];

typeSchema.insertColumns = [
  typeSchema.nameColumn,
  typeSchema.productCodeColumn,
  typeSchema.productTypeIdColumn,
  typeSchema.productManufacturerIdColumn,
  typeSchema.baseProductIdColumn,
  typeSchema.descriptionColumn,
  typeSchema.imagesDirColumn,
  typeSchema.rumouredDateColumn,
  typeSchema.launchDateColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.productCodeColumn,
  typeSchema.productTypeIdColumn,
  typeSchema.productManufacturerIdColumn,
  typeSchema.baseProductIdColumn,
  typeSchema.descriptionColumn,
  typeSchema.imagesDirColumn,
  typeSchema.rumouredDateColumn,
  typeSchema.launchDateColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.nameColumn]: schemaHelper.dataTypes.string,
    [typeSchema.productCodeColumn]: schemaHelper.dataTypes.stringOptional,
    [typeSchema.productTypeIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.productManufacturerIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.baseProductIdColumn]: schemaHelper.dataTypes.numberOptional,
    [typeSchema.descriptionColumn]: schemaHelper.dataTypes.stringOptional,
    [typeSchema.imagesDirColumn]: schemaHelper.dataTypes.stringOptional,
    [typeSchema.rumouredDateColumn]: schemaHelper.dataTypes.dateOptional,
    [typeSchema.launchDateColumn]: schemaHelper.dataTypes.dateOptional,
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
