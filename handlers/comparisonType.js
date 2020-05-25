const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/comparisonType");
const genericRouter = require("./genericRouter");
// eslint-disable-next-line no-unused-vars
// const logger = require("../utils/logger");

// logger.info(schema, "comparisonType schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelComparisonType
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
 * @apiDefine UpdateModelComparisonType
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
 * @apiDefine AddOrUpdateResponseComparisonType
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
 * @apiDefine GetByKeyOrDeleteResponseComparisonType
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
 * @api {get} /comparisonTypes/ Get/Search
 * @apiName GetComparisonTypes
 * @apiGroup ComparisonType
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
 *      ],
 *      "totalCount": 1
 *  }
 *
 *  @apiUse NotFoundError
 *
 */

/*
/**
 * @api {get} /comparisonTypes/:id Get by key
 * @apiName GetComparisonType
 * @apiGroup ComparisonType
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseComparisonType
 *
 */

/*
/**
 * @api {delete} /comparisonTypes/:id Delete by key
 * @apiName DeleteComparisonType
 * @apiGroup ComparisonType
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseComparisonType
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /comparisonTypes Add item
 * @apiName AddComparisonType
 * @apiGroup ComparisonType
 *
 * @apiUse AddModelComparisonType
 *
 * @apiUse AddOrUpdateResponseComparisonType
 *
 */

/**
 * @api {put} /comparisonTypes Update item
 * @apiName UpdateComparisonType
 * @apiGroup ComparisonType
 *
 * @apiUse UpdateModelComparisonType
 *
 * @apiUse AddOrUpdateResponseComparisonType
 *
 */

/**
 * @api {post} /comparisonTypes/op/delete Bulk Delete
 * @apiName BulkDeleteComparisonType
 * @apiGroup ComparisonType
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseComparisonType
 */
