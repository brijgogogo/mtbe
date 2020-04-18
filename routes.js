const handlers = require("./handlers");
const productsApi = require("./handlers/product");
const productCategoriesApi = require("./handlers/productCategories");

module.exports = (app) => {
  app.get("/", handlers.home);
  app.get("/about", handlers.about);

  app.use("/api/products", productsApi);
  app.use("/api/productCategories", productCategoriesApi);
};

