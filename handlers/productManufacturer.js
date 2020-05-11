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
 *                    { "name": "Apple", "website_url": "apple.com" }
 *            ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelProductManufacturer
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *                    { "id": 1, "name": "Apple", "website_url": "apple.com" }
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
 *          {
 *              "id": 30,
 *              "name": "Apple",
 *              "website_url": "apple.com",
 *              "created_by": 1,
 *              "created_date": "2020-05-11T22:01:52.229Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *          }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseProductManufacturer
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *          {
 *              "id": 30,
 *              "name": "Apple",
 *              "website_url": "apple.com",
 *              "created_by": 1,
 *              "created_date": "2020-05-11T22:01:52.229Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *          }
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
 *          {
 *              "id": 1,
 *              "name": "Samsung",
 *              "website_url": "samsung.com",
 *              "created_by": 1,
 *              "created_date": "2020-04-19T19:14:33.661Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *          },
 *          {
 *              "id": 6,
 *              "name": "OnePlus",
 *              "website_url": "http://oneplus.com",
 *              "created_by": 1,
 *              "created_date": "2020-04-19T19:14:33.661Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *          }
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
