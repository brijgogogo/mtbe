const Koa = require("koa");
const config = require("./config");
const logger = require("./utils/logger");
const routes = require("./routes");
const cors = require("@koa/cors");

logger.info("staring app");

const app = new Koa();
app.env = config.env;
logger.info(`env: ${app.env}`);

app.on("error", (err, ctx) => {
  logger.error({ err, ctx }, "server error");
});

const responseHeader = "X-Response-Time";

logger.info(config.whitelist, "cors-whitelist");

function checkOrigin(ctx) {
  const requestOrigin = ctx.accept.headers.origin;

  if (!config.whitelist.includes(requestOrigin)) {
    return ctx.throw(`${requestOrigin} is not valid origin`);
  }

  return requestOrigin;
}

app.use(
  cors({
    origin: checkOrigin,
  })
);

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get(responseHeader);
  logger.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set(responseHeader, `${ms}ms`);
});

app.use(routes.routes());
app.use(routes.allowedMethods());

logger.info(`listening on port ${config.port}`);
const server = app.listen(config.port);

function cleanup() {
  console.log("server closing...");
  server.close(() => {
    console.log("server closed");
    process.exit(0);
  });
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
