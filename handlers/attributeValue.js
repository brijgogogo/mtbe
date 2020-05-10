const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/attributeValue");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

// logger.info(schema, "attribute value schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;
