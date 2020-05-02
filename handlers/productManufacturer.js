const db = require("../db/productManufacturer");
const express = require("express");
const router = express.Router();
const utils = require("../utils");
const logger = require("../utils/logger");

const reservedQueryKeys = [
  // query string
  "q", // search string
  "s", // field:a/d : sort
  "l", //<number> : pagination limit
  "o", //<number> : pagination skip/offset
  "f", //a,b,c : fields to get separated by comma
];

// field=value

router.get("/", async (req, res) => {
  try {
    const options = {};

    if (typeof req.query.q != "undefined") {
      options.query = req.query.q;
    }

    if (typeof req.query.s != "undefined") {
      const values = req.query.s.split(":");
      options.sortBy = values[0];
      options.sortDirection =
        values.length > 1 && values[1].toLowerCase() === "d" ? "DESC" : "ASC";
    }

    if (typeof req.query.l != "undefined") {
      options.limit = req.query.l;
    }

    if (typeof req.query.o != "undefined") {
      options.offset = req.query.o;
    }

    if (typeof req.query.f != "undefined") {
      options.fields = req.query.f.split(",");
    }

    options.conditions = utils.removeKeys(req.query, reservedQueryKeys);

    const values = await db.getAll(options);
    res.json(values);
  } catch (error) {
    logger.error(error);
  }
});

router.get("/:id", async (req, res) => {
  const options = {
    ids: [req.params.id],
  };
  const values = await db.getAll(options);
  res.json(values);
});

router.post("/", async (req, res) => {
  const options = req.body;
  const result = await db.add(options);
  res.json(result);
});

router.put("/", async (req, res) => {
  const options = req.body;
  const result = await db.update(options);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const options = {
    keys: [req.params.id],
  };
  const result = await db.delete(options);
  res.json(result);
});

module.exports = router;

// result
// items
// totalItems (without offset/limit)
