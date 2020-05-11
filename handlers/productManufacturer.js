const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/productManufacturer");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

// logger.info(schema, "productType schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine NotFoundError
 *
 * @apiError NotFound No records were found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotFound"
 *     }
 */

/**
 * @apiDefine DeleteNotFound
 *
 * @apiError NotFound Item not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *       Key does not exist
 */

/**
 * @apiDefine AddModel
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
 * @apiDefine UpdateModel
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
 * @apiDefine AddOrUpdateResponse
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
 * @apiDefine queryString
 *
 * @apiDescription Allows to search, paginate, project, denormalize records
 *
 * Query String options:
 *
 * q=[serachString]
 *
 * s=[sortField]:[a/d]  (Sort by field. a=ASC, d=DESC)
 *
 * l=[limit]         (limit number of records)
 *
 * o=[offset]        (number of records to offset/skip)
 *
 * f=[field1,field2]   (specific fields to get)
 *
 * d=1   (denormalized/join query)
 *
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
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *      {
 *          "id": 1,
 *          "name": "Samsung",
 *          "website_url": "samsung.com",
 *          "created_by": 1,
 *          "created_date": "2020-04-19T19:14:33.661Z",
 *          "modified_by": null,
 *          "modified_date": null,
 *          "source": null,
 *          "status": 1
 *      }
 *  ]
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
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *      {
 *          "id": 1,
 *          "name": "Samsung",
 *          "website_url": "samsung.com",
 *          "created_by": 1,
 *          "created_date": "2020-04-19T19:14:33.661Z",
 *          "modified_by": null,
 *          "modified_date": null,
 *          "source": null,
 *          "status": 1
 *      }
 *  ]
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /productManufacturers Add item
 * @apiName AddProductManufacturer
 * @apiGroup ProductManufacturer
 *
 * @apiUse AddModel
 *
 * @apiUse AddOrUpdateResponse
 *
 */

/**
 * @api {put} /productManufacturers Update item
 * @apiName UpdateProductManufacturer
 * @apiGroup ProductManufacturer
 *
 * @apiUse UpdateModel
 *
 * @apiUse AddOrUpdateResponse
 *
 */
