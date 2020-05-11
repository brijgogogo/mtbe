const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/productType");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

logger.info(schema, "productType schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelProductType
 * @apiParam {Object} RequestObject Items to add and user id in format:
 *
 *    {
 *      "items": [
 *         { "name": "Furniture", "description": "Furniture", "product_type_id": null }
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
 *         { "id" : 1, "name": "Furniture", "description": "Furniture", "product_type_id": null }
 *            ],
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
 *         {
 *              "id": 20,
 *              "name": "Electronics",
 *              "description": "Products running with battery or electricity",
 *              "product_type_id": null,
 *              "created_by": 1,
 *              "created_date": "2020-05-11T22:33:05.045Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *          }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseProductType
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *         {
 *              "id": 20,
 *              "name": "Electronics",
 *              "description": "Products running with battery or electricity",
 *              "product_type_id": null,
 *              "created_by": 1,
 *              "created_date": "2020-05-11T22:33:05.045Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
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
 *         {
 *              "id": 20,
 *              "name": "Electronics",
 *              "description": "Products running with battery or electricity",
 *              "product_type_id": null,
 *              "created_by": 1,
 *              "created_date": "2020-05-11T22:33:05.045Z",
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
