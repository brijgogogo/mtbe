const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/productAttributeValue");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

logger.info(schema, "productAttributeValue schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelProductAttributeValue
 * @apiParam {Object} RequestObject Items to add and user id in format:
 *
 *    {
 *      "items": [
 *         { "productId": 3, "attrValueId" : 1 }
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelProductAttributeValue
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *         { "id": 1, "productId": 3, "attrValueId" : 1 }
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine AddOrUpdateResponseProductAttributeValue
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *   {
 *      "items": [
 *         {
 *             "id": 3,
 *             "productId": 3,
 *             "attrValueId": 1,
 *             "description": null,
 *             "crtBy": 1,
 *             "crtAt": "2020-05-25T23:00:00.000Z",
 *             "modAt": null,
 *             "modBy": null,
 *             "source": null,
 *             "state": 1
 *         }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseProductAttributeValue
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *         {
 *             "id": 3,
 *             "productId": 3,
 *             "attrValueId": 1,
 *             "description": null,
 *             "crtBy": 1,
 *             "crtAt": "2020-05-25T23:00:00.000Z",
 *             "modAt": null,
 *             "modBy": null,
 *             "source": null,
 *             "state": 1
 *         }
 *  ]
 */

/*
/**
 * @api {get} /productAttributeValues/ Get/Search
 * @apiName GetProductAttributeValues
 * @apiGroup ProductAttributeValue
 * @apiUse queryString
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "items": [
 *         {
 *             "id": 3,
 *             "productId": 3,
 *             "attrValueId": 1,
 *             "description": null,
 *             "crtBy": 1,
 *             "crtAt": "2020-05-25T23:00:00.000Z",
 *             "modAt": null,
 *             "modBy": null,
 *             "source": null,
 *             "state": 1
 *         }
 *      ],
 *      "totalCount": 1
 *  }
 *
 *  @apiUse NotFoundError
 *
 */

/*
/**
 * @api {get} /productAttributeValues/:id Get by key
 * @apiName GetProductAttributeValue
 * @apiGroup ProductAttributeValue
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseProductAttributeValue
 *
 */

/*
/**
 * @api {delete} /productAttributeValues/:id Delete by key
 * @apiName DeleteProductAttributeValue
 * @apiGroup ProductAttributeValue
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseProductAttributeValue
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /productAttributeValues Add item
 * @apiName AddProductAttributeValue
 * @apiGroup ProductAttributeValue
 *
 * @apiUse AddModelProductAttributeValue
 *
 * @apiUse AddOrUpdateResponseProductAttributeValue
 *
 */

/**
 * @api {put} /productAttributeValues Update item
 * @apiName UpdateProductAttributeValue
 * @apiGroup ProductAttributeValue
 *
 * @apiUse UpdateModelProductAttributeValue
 *
 * @apiUse AddOrUpdateResponseProductAttributeValue
 *
 */

/**
 * @api {post} /productAttributeValues/op/delete Bulk Delete
 * @apiName BulkDeleteProductAttributeValue
 * @apiGroup ProductAttributeValue
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseProductAttributeValue
 */
