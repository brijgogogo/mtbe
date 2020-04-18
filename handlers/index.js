const title = "Voice that matters";

exports.about = (req, res) => {
  res.render("about", { today: title });
};

exports.home = (req, res) => res.render("home");

exports.notFound = (req, res) => {
  // res.type('text/plain')
  res.status(404);
  // res.send('404 - Not Found')
  res.render("404");
};

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
  console.error(err.message);
  // res.type('text/plain')
  res.status(500);
  // res.send('500 - Server Error')
  res.render("500");
};
/* eslint-enable no-unused-vars */
