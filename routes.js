// const productsApi = require("./handlers/product");
// const productCategoriesApi = require("./handlers/productCategories");
const productManufacturerApi = require("./handlers/productManufacturer");
const Router = require("@koa/router");

const router = new Router();
router.get("/", (ctx) => {
  ctx.body = "hello world!";
});

router.get("/health", (ctx) => {
  ctx.body = "working!";
});

const apiRouter = new Router();

apiRouter.get("/", (ctx) => {
  ctx.body = "MT API";
});

// apiRouter.use("/api/products", productsApi);
// app.use("/api/productCategories", productCategoriesApi);
apiRouter.use(
  "/productManufacturers",
  productManufacturerApi.routes(),
  productManufacturerApi.allowedMethods()
);

router.use("/api", apiRouter.routes(), apiRouter.allowedMethods());

module.exports = function (app) {
  app.use(router.routes());
};

module.exports = {
  routes() {
    return router.routes();
  },
  allowedMethods() {
    return router.allowedMethods();
  },
};
