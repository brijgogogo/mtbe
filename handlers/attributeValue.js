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
 *        { "attrId" : 4, "attrValueText": "4G", "attrValueDesc": "4G Technology" }
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
 *        { "id": 1, "attrId" : 4, "attrValueText": "4G", "attrValueDesc": "4G Technology" }
 *      ],
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
 *        {
 *            "id": 1,
 *            "attrId": 4,
 *            "attrValueText": "4G",
 *            "attrValueDesc": "4G Technology",
 *            "crtBy": 1,
 *            "crtAt": "2020-05-24T23:00:00.000Z",
 *            "modAt": null,
 *            "modBy": null,
 *            "source": null,
 *            "state": 1
 *        }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseAttributeValue
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *        {
 *            "id": 1,
 *            "attrId": 4,
 *            "attrValueText": "4G",
 *            "attrValueDesc": "4G Technology",
 *            "crtBy": 1,
 *            "crtAt": "2020-05-24T23:00:00.000Z",
 *            "modAt": null,
 *            "modBy": null,
 *            "source": null,
 *            "state": 1
 *        }
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
 *        {
 *            "id": 1,
 *            "attrId": 4,
 *            "attrValueText": "4G",
 *            "attrValueDesc": "4G Technology",
 *            "crtBy": 1,
 *            "crtAt": "2020-05-24T23:00:00.000Z",
 *            "modAt": null,
 *            "modBy": null,
 *            "source": null,
 *            "state": 1
 *        }
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
