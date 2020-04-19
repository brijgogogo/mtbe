const db = require("./index");
const _ = require("lodash");

var selectSql = "SELECT * FROM product";
var countSql = "SELECT COUNT(*) FROM product";

module.exports = {
  getProductCount: async () => {
    const { rows } = await db.query(countSql);
    return Number(rows[0].count);
  },
  getProducts: async (options = {}) => {
    let query = selectSql;
    if (options.id !== undefined) {
      query = query + " WHERE id = " + options.id;
    }

    const { rows } = await db.query(query);
    const products = rows.map((row) => {
      const product = _.mapKeys(row, (v, k) => _.camelCase(k));
      return product;
    });

    return products;
  },
  addProduct: async (product) => {
    await db.query(
      "INSERT INTO product (id, name) " +
        "VALUES ($1, $2) " +
        " ON CONFLICT DO NOTHING",
      [product.id, product.name]
    );
  },
};
