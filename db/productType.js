const db = require("./index");
const GenericDb = require("./genericDb");
const productTypeSchema = require("./schemas/productType");
const attributeSchema = require("./schemas/attribute");
const schemaHelper = require("./schemaHelper");

const productTypeDb = new GenericDb(productTypeSchema);
const sql = db.sql;

productTypeDb.add = async (options) => {
  const attributes = [];

  options.items.forEach((e) => {
    if (typeof e.attributes !== "undefined" && e.attributes.length > 0) {
      attributes.push(e.attributes);
    } else {
      e.push(null);
    }

    delete e.attributes;

    schemaHelper.setAddInfo(e, options.userId);
  });

  const { insertSchema, table, insertColumns } = productTypeSchema;

  const [errors, objects] = schemaHelper.validate(options.items, insertSchema);

  if (errors.length > 0) {
    return { errors: errors };
  }

  const addedObjects = await sql`
      INSERT INTO ${sql(table)}
      ${sql(objects, ...insertColumns)}
      RETURNING *
      `;

  //todo:
  // - set product_type_id to product_type_attribute
  // save them to db (transaction)
  // put them back

  return {
    items: addedObjects,
  };
};
