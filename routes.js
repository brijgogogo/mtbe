// const productsApi = require("./handlers/product");
// const productCategoriesApi = require("./handlers/productCategories");
const productManufacturerApi = require("./handlers/productManufacturer");
const productTypeApi = require("./handlers/productType");
const atributeApi = require("./handlers/attribute");
const Router = require("@koa/router");
const logger = require("./utils/logger");

const router = new Router();
router.get("/", (ctx) => {
  ctx.body = "MT";
});

router.get("/health", (ctx) => {
  ctx.body = "working!";
});

const apiRouter = new Router();

apiRouter.get("/", (ctx) => {
  ctx.body = "MT API";
});

apiRouter.use(
  "/productManufacturers",
  productManufacturerApi.routes(),
  productManufacturerApi.allowedMethods()
);

apiRouter.use(
  "/productType",
  productTypeApi.routes(),
  productTypeApi.allowedMethods()
);

apiRouter.use("/attribute", atributeApi.routes(), atributeApi.allowedMethods());

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
