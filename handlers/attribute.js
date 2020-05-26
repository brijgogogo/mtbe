const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/attribute");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

// logger.info(schema, "attribute schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelAttribute
 * @apiParam {Object} RequestObject Items to add and user id in format:
 *
 *    {
 *      "items": [
 *        {"name": "abc", "description":null,"displayText":"","baseAttrId":null,"dataType":null,"unitType":null,"comparisonType":null,"state":1,"crtAt":"2020-05-14T14:42:51.838Z","crtBy":1}
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelAttribute
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *        { "id": 1, "name": "abc", "description":null,"displayText":"","baseAttrId":null,"dataType":null,"unitType":null,"comparisonType":null,"state":1,"crtAt":"2020-05-14T14:42:51.838Z","crtBy":1}
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine AddOrUpdateResponseAttribute
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *   {
 *      "items": [
 *          {
 *              "id": 5,
 *              "name": "abc",
 *              "description": null,
 *              "displayText": "",
 *              "dataType": null,
 *              "unitType": null,
 *              "comparisonType": null,
 *              "baseAttrId": null,
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
 * @apiDefine GetByKeyOrDeleteResponseAttribute
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *          {
 *              "id": 5,
 *              "name": "abc",
 *              "description": null,
 *              "displayText": "",
 *              "dataType": null,
 *              "unitType": null,
 *              "comparisonType": null,
 *              "baseAttrId": null,
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
 * @api {get} /attributes/ Get/Search
 * @apiName GetAttributes
 * @apiGroup Attribute
 * @apiUse queryString
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "items": [
 *          {
 *              "id": 5,
 *              "name": "abc",
 *              "description": null,
 *              "displayText": "",
 *              "dataType": null,
 *              "unitType": null,
 *              "comparisonType": null,
 *              "baseAttrId": null,
 *              "crtBy": 1,
 *              "crtAt": "2020-05-24T23:00:00.000Z",
 *              "modAt": null,
 *              "modBy": null,
 *              "source": null,
 *              "state": 1
 *          }
 *      ]
 *  }
 *
 *  @apiUse NotFoundError
 *
 */

/*
/**
 * @api {get} /attributes/:id Get by key
 * @apiName GetAttribute
 * @apiGroup Attribute
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseAttribute
 *
 */

/*
/**
 * @api {delete} /attributes/:id Delete by key
 * @apiName DeleteAttribute
 * @apiGroup Attribute
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseAttribute
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /attributes Add item
 * @apiName AddAttribute
 * @apiGroup Attribute
 *
 * @apiUse AddModelAttribute
 *
 * @apiUse AddOrUpdateResponseAttribute
 *
 */

/**
 * @api {put} /attributes Update item
 * @apiName UpdateAttribute
 * @apiGroup Attribute
 *
 * @apiUse UpdateModelAttribute
 *
 * @apiUse AddOrUpdateResponseAttribute
 *
 */

/**
 * @api {post} /attributes/op/delete Bulk Delete
 * @apiName BulkDeleteAttribute
 * @apiGroup Attribute
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseAttribute
 */
