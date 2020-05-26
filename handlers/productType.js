const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/productType");
const genericRouter = require("./genericRouter");
// eslint-disable-next-line no-unused-vars
const logger = require("../utils/logger");

// logger.info(schema, "productType schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelProductType
 * @apiParam {Object} RequestObject Items to add and user id in format:
 *
 *    {
 *      "items": [
 *  	  { "name": "Electronics1", "description": "Products running with battery or electricity" },
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelProductType
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *  	  { "id": 1, "name": "Electronics1", "description": "Products running with battery or electricity" },
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine AddOrUpdateResponseProductType
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *   {
 *      "items": [
 *          {
 *              "id": 5,
 *              "name": "Electronics1",
 *              "description": "Products running with battery or electricity",
 *              "productTypeId": null,
 *              "crtBy": 1,
 *              "crtAt": "2020-05-24T23:00:00.000Z",
 *              "modAt": null,
 *              "modBy": null,
 *              "source": null,
 *              "state": 1
 *          }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseProductType
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *          {
 *              "id": 5,
 *              "name": "Electronics1",
 *              "description": "Products running with battery or electricity",
 *              "productTypeId": null,
 *              "crtBy": 1,
 *              "crtAt": "2020-05-24T23:00:00.000Z",
 *              "modAt": null,
 *              "modBy": null,
 *              "source": null,
 *              "state": 1
 *          }
 *  ]
 */

/*
/**
 * @api {get} /productTypes/ Get/Search
 * @apiName GetProductTypes
 * @apiGroup ProductType
 * @apiUse queryString
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "items": [
 *          {
 *              "id": 5,
 *              "name": "Electronics1",
 *              "description": "Products running with battery or electricity",
 *              "productTypeId": null,
 *              "crtBy": 1,
 *              "crtAt": "2020-05-24T23:00:00.000Z",
 *              "modAt": null,
 *              "modBy": null,
 *              "source": null,
 *              "state": 1
 *          }
 *      ],
 *      "totalCount": 1
 *  }
 *
 *  @apiUse NotFoundError
 *
 */

/*
/**
 * @api {get} /productTypes/:id Get by key
 * @apiName GetProductType
 * @apiGroup ProductType
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseProductType
 *
 */

/*
/**
 * @api {delete} /productTypes/:id Delete by key
 * @apiName DeleteProductType
 * @apiGroup ProductType
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseProductType
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /productTypes Add item
 * @apiName AddProductType
 * @apiGroup ProductType
 *
 * @apiUse AddModelProductType
 *
 * @apiUse AddOrUpdateResponseProductType
 *
 */

/**
 * @api {put} /productTypes Update item
 * @apiName UpdateProductType
 * @apiGroup ProductType
 *
 * @apiUse UpdateModelProductType
 *
 * @apiUse AddOrUpdateResponseProductType
 *
 */

/**
 * @api {post} /productTypes/op/delete Bulk Delete
 * @apiName BulkDeleteProductType
 * @apiGroup ProductType
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseProductType
 */
