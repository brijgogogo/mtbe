const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/unitType");
const genericRouter = require("./genericRouter");
// eslint-disable-next-line no-unused-vars
// const logger = require("../utils/logger");

// logger.info(schema, "unitType schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelUnitType
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
 * @apiDefine UpdateModelUnitType
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *        {
 *            "id": 1,
 *            "name": "text",
 *            "description": "text based data",
 *            "displayText": "text",
 *            "source": "System",
 *            "state": 1
 *        }
 *      ]
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine AddOrUpdateResponseUnitType
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
 *            "source": "System",
 *            "state": 1
 *        }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseUnitType
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *        {
 *            "id": 1,
 *            "name": "text",
 *            "description": "text based data",
 *            "displayText": "text",
 *            "source": "System",
 *            "state": 1
 *        }
 *  ]
 */

/*
/**
 * @api {get} /unitTypes/ Get/Search
 * @apiName GetUnitTypes
 * @apiGroup UnitType
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
 * @api {get} /unitTypes/:id Get by key
 * @apiName GetUnitType
 * @apiGroup UnitType
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseUnitType
 *
 */

/*
/**
 * @api {delete} /unitTypes/:id Delete by key
 * @apiName DeleteUnitType
 * @apiGroup UnitType
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseUnitType
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /unitTypes Add item
 * @apiName AddUnitType
 * @apiGroup UnitType
 *
 * @apiUse AddModelUnitType
 *
 * @apiUse AddOrUpdateResponseUnitType
 *
 */

/**
 * @api {put} /unitTypes Update item
 * @apiName UpdateUnitType
 * @apiGroup UnitType
 *
 * @apiUse UpdateModelUnitType
 *
 * @apiUse AddOrUpdateResponseUnitType
 *
 */

/**
 * @api {post} /unitTypes/op/delete Bulk Delete
 * @apiName BulkDeleteUnitType
 * @apiGroup UnitType
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseUnitType
 */
