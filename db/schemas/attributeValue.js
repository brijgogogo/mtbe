const superstruct = require("superstruct");
const schemaHelper = require("../schemaHelper");
const utils = require("../../utils");

const typeSchema = {
  table: "attrValue",
  keyColumn: "id",
  attrIdColumn: "attrId",
  attrValueTextColumn: "attrValueText",
  attrValueDescColumn: "attrValueDesc",
};

typeSchema.allColumns = [
  typeSchema.keyColumn,
  typeSchema.attrIdColumn,
  typeSchema.attrValueTextColumn,
  typeSchema.attrValueDescColumn,
].concat(schemaHelper.metaColumns);

typeSchema.queryColumns = [
  typeSchema.attrValueTextColumn,
  typeSchema.attrValueDescColumn,
];

typeSchema.insertColumns = [
  typeSchema.attrIdColumn,
  typeSchema.attrValueTextColumn,
  typeSchema.attrValueDescColumn,
].concat(schemaHelper.insertMetaColumns);

typeSchema.updateColumns = [
  typeSchema.keyColumn,
  typeSchema.attrIdColumn,
  typeSchema.attrValueTextColumn,
  typeSchema.attrValueDescColumn,
].concat(schemaHelper.updateMetaColumns);

typeSchema.schema = {
  ...{
    [typeSchema.keyColumn]: schemaHelper.dataTypes.number,
    [typeSchema.attrIdColumn]: schemaHelper.dataTypes.number,
    [typeSchema.attrValueTextColumn]: schemaHelper.dataTypes.string,
    [typeSchema.attrValueDescColumn]: schemaHelper.dataTypes.stringOptional,
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
typeSchema.attrIdNameColumn = typeSchema.attrIdColumn + schemaHelper.viewSuffix;

typeSchema.denormalizedColumns = typeSchema.allColumns
  .concat([typeSchema.attrIdNameColumn])
  .concat(schemaHelper.denormalizedMetaColumns);

module.exports = typeSchema;
