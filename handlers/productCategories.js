const db = require("../db");

db.query(
  "SELECT * FORM productCategories WHERE id = $1",
  [req.params.id],
  (err, res) => {
    if (err) {
      return next(err);
    }

    res.send(res.rows[0]);
  }
);
