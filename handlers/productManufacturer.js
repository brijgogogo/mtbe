const db = require("../db/productManufacturer");
const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const responseHelper = require("./responseHelper");
const requestHelper = require("./requestHelper");

// field=value

router.get("/", async (req, res) => {
  try {
    const options = requestHelper.parseQuery(req);
    const result = await db.getAll(options);
    if (result.error) {
      res.status(404);
      res.send(result.error);
    } else {
      res.json(result);
    }
  } catch (error) {
    logger.error(error, "Query failure");
    res.status(500);
    res.send("Request failed!");
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
  responseHelper.sendAddResponse(res, result);
});

router.put("/", async (req, res) => {
  const options = req.body;
  const result = await db.update(options);
  responseHelper.sendUpdateResponse(res, result);
});

router.delete("/:id", async (req, res) => {
  const options = {
    keys: [req.params.id],
  };
  const result = await db.delete(options);
  responseHelper.sendDeleteResponse(res, result);
});

module.exports = router;
