const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "product_manufacturer",
  keyColumn: "id",
  nameColumn: "name",
  websiteUrlColumn: "website_url",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.websiteUrlColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = [typeSchema.nameColumn, typeSchema.websiteUrlColumn];

typeSchema.insertColumns = [
  typeSchema.nameColumn,
  typeSchema.websiteUrlColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.nameColumn,
  typeSchema.websiteUrlColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.nameColumn]: schemaHelper.dataTypes.string,
    [typeSchema.websiteUrlColumn]: schemaHelper.dataTypes.stringOptional,
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
