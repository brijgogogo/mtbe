const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/productManufacturer");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

// logger.info(schema, "productType schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelProductManufacturer
 * @apiParam {Object} RequestObject Items to add and user id in format:
 *
 *    {
 *      "items": [
 *          { "name": "AppleInc", "websiteUrl": "apple.com" } *
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelProductManufacturer
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *          { "id": 1, "name": "AppleInc", "websiteUrl": "apple.com" } *
 *            ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine AddOrUpdateResponseProductManufacturer
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *   {
 *      "items": [
 *         {
 *             "id": 3,
 *             "name": "AppleInc",
 *             "description": null,
 *             "websiteUrl": "apple.com",
 *             "crtBy": 1,
 *             "crtAt": "2020-05-24T23:00:00.000Z",
 *             "modAt": null,
 *             "modBy": null,
 *             "source": null,
 *             "state": 1
 *         }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseProductManufacturer
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *         {
 *             "id": 3,
 *             "name": "AppleInc",
 *             "description": null,
 *             "websiteUrl": "apple.com",
 *             "crtBy": 1,
 *             "crtAt": "2020-05-24T23:00:00.000Z",
 *             "modAt": null,
 *             "modBy": null,
 *             "source": null,
 *             "state": 1
 *         }
 *  ]
 */

/*
/**
 * @api {get} /productManufacturers/ Get/Search
 * @apiName GetProductManufacturers
 * @apiGroup ProductManufacturer
 * @apiUse queryString
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "items": [
 *         {
 *             "id": 3,
 *             "name": "AppleInc",
 *             "description": null,
 *             "websiteUrl": "apple.com",
 *             "crtBy": 1,
 *             "crtAt": "2020-05-24T23:00:00.000Z",
 *             "modAt": null,
 *             "modBy": null,
 *             "source": null,
 *             "state": 1
 *         }
 *      ]
 *  }
 *
 *  @apiUse NotFoundError
 *
 */

/*
/**
 * @api {get} /productManufacturers/:id Get by key
 * @apiName GetProductManufacturer
 * @apiGroup ProductManufacturer
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseProductManufacturer
 *
 */

/*
/**
 * @api {delete} /productManufacturers/:id Delete by key
 * @apiName DeleteProductManufacturer
 * @apiGroup ProductManufacturer
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseProductManufacturer
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /productManufacturers Add item
 * @apiName AddProductManufacturer
 * @apiGroup ProductManufacturer
 *
 * @apiUse AddModelProductManufacturer
 *
 * @apiUse AddOrUpdateResponseProductManufacturer
 *
 */

/**
 * @api {put} /productManufacturers Update item
 * @apiName UpdateProductManufacturer
 * @apiGroup ProductManufacturer
 *
 * @apiUse UpdateModelProductManufacturer
 *
 * @apiUse AddOrUpdateResponseProductManufacturer
 *
 */

/**
 * @api {post} /productManufacturers/op/delete Bulk Delete
 * @apiName BulkDeleteProductManufacturer
 * @apiGroup ProductManufacturer
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseProductManufacturer
 */
