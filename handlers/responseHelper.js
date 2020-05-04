module.exports = {
  sendAddResponse: function (res, result) {
    if (result.errors) {
      this.sendValidationErrors(res, result.errors);
    } else {
      res.status(201);
      res.json(result.items);
    }
  },
  sendUpdateResponse: function (res, result) {
    if (result.errors) {
      this.sendValidationErrors(res, result.errors);
    } else {
      res.status(200);
      res.json(result.items);
    }
  },
  sendValidationErrors: function (res, errors) {
    res.status(422);
    res.json({ errors: errors });
  },
  sendDeleteResponse: function (res, result) {
    if (result && result.length > 0) {
      res.json({ items: result });
    } else {
      res.status(404);
      res.send("Key does not exist");
    }
  },
};
