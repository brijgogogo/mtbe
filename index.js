const express = require("express");
require("express-async-errors");
const expressHandlebars = require("express-handlebars");
const handlers = require("./handlers");
const morgan = require("morgan");
const mountRoutes = require("./routes");
const fs = require("fs");
const { promisify } = require("util");
const cors = require("cors");
const config = require("./config");
const bodyParser = require("body-parser");

const app = express(); // application instance
app.use("/api", cors());
app.use("/api", bodyParser.json());
app.use("/api", bodyParser.urlencoded({ extended: true }));
app.locals.appName = "MTBE";

morgan.token("host", function (req, res) {
  return req.hostname;
});

morgan.token("param", function (req, res, param) {
  return req.params[param];
});

app.use(
  morgan(
    ":method :host :status :param[i] :res[content-length] - :response-time ms"
  )
);
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main", // views/layouts/main.handlebars
  })
);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

mountRoutes(app);

/*
const appRouter = express.Router();
appRouter.route("/products").get((req, res) => {
  const response = { hello: "This is api" };
  res.json(response);
});

app.use("/api", appRouter);
*/

const autoViews = {};
const fileExists = promisify(fs.exists);
// auto-render file from /view/<path>.handlebars
app.use(async (req, res, next) => {
  const path = req.path.toLowerCase();
  if (autoViews[path]) {
    try {
      return res.render(autoViews[path]);
    } catch (error) {
      console.error(error);
      delete autoViews[path]; // file may have been deleted, but still resides in cache
    }
  }
  if (await fileExists(__dirname + "/views" + path + ".handlebars")) {
    autoViews[path] = path.replace(/^\//, "");
    return res.render(autoViews[path]);
  }
  // no view found; pass on to 404 handler
  next();
});

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(config.port, () =>
    console.log(
      `Express started on http://localhost:${config.port}` +
        `press Ctrl-C to terminate.`
    )
  );
} else {
  module.exports = app;
}
