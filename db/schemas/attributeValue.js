const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "attribute_value",
  keyColumn: "id",
  attributeIdColumn: "attribute_id",
  attributeValueNameColumn: "attribute_value_name",
  attributeValueDescColumn: "attribute_value_desc",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.attributeIdColumn,
  typeSchema.attributeValueNameColumn,
  typeSchema.attributeValueDescColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = [
  typeSchema.attributeValueNameColumn,
  typeSchema.attributeValueDescColumn,
];

typeSchema.insertColumns = [
  typeSchema.attributeIdColumn,
  typeSchema.attributeValueNameColumn,
  typeSchema.attributeValueDescColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.attributeIdColumn,
  typeSchema.attributeValueNameColumn,
  typeSchema.attributeValueDescColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.attributeIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.attributeValueNameColumn]: schemaHelper.dataTypes.string,
    [typeSchema.attributeValueDescColumn]:
      schemaHelper.dataTypes.stringOptional,
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
