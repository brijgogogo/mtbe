const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/attributeValue");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

// logger.info(schema, "attribute value schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelAttributeValue
 * @apiParam {Object} RequestObject Items to add and user id in format:
 *
 *    {
 *      "items": [
 *         { "name": "Weight", "description": "Weight", "data_type": 1 }
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelAttributeValue
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *         { "id": 1, "name": "Weight", "description": "Weight", "data_type": 1 }
 *            ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine AddOrUpdateResponseAttributeValue
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *   {
 *      "items": [
 *          {
 *              "id": 11,
 *              "attribute_id": 4,
 *              "attribute_value_name": "4G",
 *              "attribute_value_desc": "4G Technology",
 *              "created_by": 1,
 *              "created_date": "2020-05-11T22:48:13.668Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *          }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseAttributeValue
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *          {
 *              "id": 11,
 *              "attribute_id": 4,
 *              "attribute_value_name": "4G",
 *              "attribute_value_desc": "4G Technology",
 *              "created_by": 1,
 *              "created_date": "2020-05-11T22:48:13.668Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *          }
 *  ]
 */

/*
/**
 * @api {get} /attributeValues/ Get/Search
 * @apiName GetAttributeValues
 * @apiGroup AttributeValue
 * @apiUse queryString
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "items": [
 *          {
 *              "id": 11,
 *              "attribute_id": 4,
 *              "attribute_value_name": "4G",
 *              "attribute_value_desc": "4G Technology",
 *              "created_by": 1,
 *              "created_date": "2020-05-11T22:48:13.668Z",
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
 * @api {get} /attributeValues/:id Get by key
 * @apiName GetAttributeValue
 * @apiGroup AttributeValue
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseAttributeValue
 *
 */

/*
/**
 * @api {delete} /attributeValues/:id Delete by key
 * @apiName DeleteAttributeValue
 * @apiGroup AttributeValue
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseAttributeValue
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /attributeValues Add item
 * @apiName AddAttributeValue
 * @apiGroup AttributeValue
 *
 * @apiUse AddModelAttributeValue
 *
 * @apiUse AddOrUpdateResponseAttributeValue
 *
 */

/**
 * @api {put} /attributeValues Update item
 * @apiName UpdateAttributeValue
 * @apiGroup AttributeValue
 *
 * @apiUse UpdateModelAttributeValue
 *
 * @apiUse AddOrUpdateResponseAttributeValue
 *
 */

/**
 * @api {post} /attributeValues/op/delete Bulk Delete
 * @apiName BulkDeleteAttributeValue
 * @apiGroup AttributeValue
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseAttributeValue
 */
