const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/dataType");
const genericRouter = require("./genericRouter");
// eslint-disable-next-line no-unused-vars
// const logger = require("../utils/logger");

// logger.info(schema, "DataType schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelDataType
 * @apiParam {Object} RequestObject Items to add and user id in format:
 *
 *    {
 *      "items": [
 *        {
 *            "name": "text",
 *            "description": "text based data",
 *            "displayText": "text",
 *            "source": "System",
 *            "state": 1
 *        },
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelDataType
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *        {
 *          "id": 1,
 *          "name": "text",
 *          "description": "text based data",
 *          "displayText": "text",
 *          "source": "System",
 *          "state": 1
 *        }
 *            ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine AddOrUpdateResponseDataType
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *   {
 *      "items": [
 *        {
 *            "id": 1,
 *            "name": "text",
 *            "description": "text based data",
 *            "displayText": "text",
 *            "crtBy": 1,
 *            "crtAt": "2020-05-25T21:27:41.582Z",
 *            "modBy": null,
 *            "modAt": null,
 *            "source": "System",
 *            "state": 1
 *        }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseDataType
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *        {
 *            "id": 1,
 *            "name": "text",
 *            "description": "text based data",
 *            "displayText": "text",
 *            "crtBy": 1,
 *            "crtAt": "2020-05-25T21:27:41.582Z",
 *            "modBy": null,
 *            "modAt": null,
 *            "source": "System",
 *            "state": 1
 *        }
 *  ]
 */

/*
/**
 * @api {get} /DataTypes/ Get/Search
 * @apiName GetDataTypes
 * @apiGroup DataType
 * @apiUse queryString
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "items": [
 *        {
 *            "id": 1,
 *            "name": "text",
 *            "description": "text based data",
 *            "displayText": "text",
 *            "crtBy": 1,
 *            "crtAt": "2020-05-25T21:27:41.582Z",
 *            "modBy": null,
 *            "modAt": null,
 *            "source": "System",
 *            "state": 1
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
 * @api {get} /DataTypes/:id Get by key
 * @apiName GetDataType
 * @apiGroup DataType
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseDataType
 *
 */

/*
/**
 * @api {delete} /DataTypes/:id Delete by key
 * @apiName DeleteDataType
 * @apiGroup DataType
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseDataType
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /DataTypes Add item
 * @apiName AddDataType
 * @apiGroup DataType
 *
 * @apiUse AddModelDataType
 *
 * @apiUse AddOrUpdateResponseDataType
 *
 */

/**
 * @api {put} /DataTypes Update item
 * @apiName UpdateDataType
 * @apiGroup DataType
 *
 * @apiUse UpdateModelDataType
 *
 * @apiUse AddOrUpdateResponseDataType
 *
 */

/**
 * @api {post} /DataTypes/op/delete Bulk Delete
 * @apiName BulkDeleteDataType
 * @apiGroup DataType
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseDataType
 */
