const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/attribute");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

logger.info(schema, "attribute schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;
