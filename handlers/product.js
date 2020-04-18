const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("products");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`product ${id}`);
});

/*
exports.getVacationsApi = async (req, res) => {
  const vacations = await db.getVacations({ available: true });
  res.json(vacations);
};

exports.getVacationBySkuApi = async (req, res) => {
  const vacation = await db.getVacationBySku(req.params.sku);
  res.json(vacation);
};

exports.addVacationInSeasonListenerApi = async (req, res) => {
  await db.addVacationInSeasonListener(req.params.sku, req.body.email);
  res.json({ message: "success" });
};

exports.requestDeleteVacationApi = async (req, res) => {
  const { email, notes } = req.body;
  res.status(500).json({ message: "not yet implemented" });
};
*/

module.exports = router;
