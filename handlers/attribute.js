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
 *         { "name": "Weight", "description": "Weight", "data_type": 1 }
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
 *         { "id" : 1, "name": "Weight", "description": "Weight", "data_type": 1 }
 *            ],
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
 *        {
 *            "id": 1,
 *            "name": "Color",
 *            "description": null,
 *            "display_name": "Color",
 *            "data_type": 1,
 *            "unit_type": null,
 *            "attribute_id": null,
 *            "comparison_type": null,
 *            "created_by": 1,
 *            "created_date": "2020-05-09T16:26:36.963Z",
 *            "modified_by": null,
 *            "modified_date": null,
 *            "source": null,
 *            "status": 1
 *        }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseAttribute
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *        {
 *            "id": 1,
 *            "name": "Color",
 *            "description": null,
 *            "display_name": "Color",
 *            "data_type": 1,
 *            "unit_type": null,
 *            "attribute_id": null,
 *            "comparison_type": null,
 *            "created_by": 1,
 *            "created_date": "2020-05-09T16:26:36.963Z",
 *            "modified_by": null,
 *            "modified_date": null,
 *            "source": null,
 *            "status": 1
 *        }
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
 *        {
 *            "id": 1,
 *            "name": "Color",
 *            "description": null,
 *            "display_name": "Color",
 *            "data_type": 1,
 *            "unit_type": null,
 *            "attribute_id": null,
 *            "comparison_type": null,
 *            "created_by": 1,
 *            "created_date": "2020-05-09T16:26:36.963Z",
 *            "modified_by": null,
 *            "modified_date": null,
 *            "source": null,
 *            "status": 1
 *        }
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
