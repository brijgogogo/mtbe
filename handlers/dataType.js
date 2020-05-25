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
 *         { "name": "Furniture", "description": "Furniture", "product_type_id": null }
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
 *         { "id" : 1, "name": "Furniture", "description": "Furniture", "product_type_id": null }
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
 * @apiDefine GetByKeyOrDeleteResponseDataType
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
 * @api {get} /DataTypes/ Get/Search
 * @apiName GetDataTypes
 * @apiGroup DataType
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
