const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/productManufacturer");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

// logger.info(schema, "productType schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;


/*
/**
 * @api {get} /productManufacturers/:id Get Product Manufacturer information
 * @apiName GetProductManufacturer
 * @apiGroup ProductManufacturer
 *
 * @apiParam {Number} id ProductManufacturer unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 */

