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
 *         { "product_id": 2, "attribute_value_id" : 1 } *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelProductAttributeValue
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *         { "productAttributeValue_type_id": 5, "attribute_id": 1, "display_order" : 1, "collapsible": false, "tags" : "General"}
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
 *        {
 *          "id": 2,
 *          "product_id": 2,
 *          "attribute_value_id": 1,
 *          "created_by": 1,
 *          "created_date": "2020-05-20T23:50:13.757Z",
 *          "modified_by": null,
 *          "modified_date": null,
 *          "source": null,
 *          "status": 1
 *        }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseProductAttributeValue
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *        {
 *          "id": 2,
 *          "product_id": 2,
 *          "attribute_value_id": 1,
 *          "created_by": 1,
 *          "created_date": "2020-05-20T23:50:13.757Z",
 *          "modified_by": null,
 *          "modified_date": null,
 *          "source": null,
 *          "status": 1
 *        }
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
 *        {
 *          "id": 2,
 *          "product_id": 2,
 *          "attribute_value_id": 1,
 *          "created_by": 1,
 *          "created_date": "2020-05-20T23:50:13.757Z",
 *          "modified_by": null,
 *          "modified_date": null,
 *          "source": null,
 *          "status": 1
 *        }
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
