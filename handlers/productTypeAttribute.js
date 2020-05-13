const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/productTypeAttribute");
const genericRouter = require("./genericRouter");
const logger = require("../utils/logger");

// logger.info(schema, "productTypeAttribute schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelProductTypeAttribute
 * @apiParam {Object} RequestObject Items to add and user id in format:
 *
 *    {
 *      "items": [
 *        { "name": "Samsung Galaxy 1", "product_code": "SMG1", "product_type_id": 4, "product_manufacturer_id": 1, "description": "Samsung phone" }
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelProductTypeAttribute
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *        { "id": 1, "name": "Samsung Galaxy 1", "product_code": "SMG1", "product_type_id": 4, "product_manufacturer_id": 1, "description": "Samsung phone" }
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine AddOrUpdateResponseProductTypeAttribute
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *   {
 *      "items": [
 *          {
 *              "id": 2,
 *              "name": "Samsung Galaxy 1",
 *              "product_code": "SMG1",
 *              "product_type_id": 4,
 *              "product_manufacturer_id": 1,
 *              "base_product_id": null,
 *              "description": "Samsung phone",
 *              "images_dir": null,
 *              "rumoured_date": null,
 *              "launch_date": null,
 *              "created_by": 1,
 *              "created_date": "2020-05-13T23:52:25.924Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *          }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseProductTypeAttribute
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *          {
 *              "id": 2,
 *              "name": "Samsung Galaxy 1",
 *              "product_code": "SMG1",
 *              "product_type_id": 4,
 *              "product_manufacturer_id": 1,
 *              "base_product_id": null,
 *              "description": "Samsung phone",
 *              "images_dir": null,
 *              "rumoured_date": null,
 *              "launch_date": null,
 *              "created_by": 1,
 *              "created_date": "2020-05-13T23:52:25.924Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *  ]
 */

/*
/**
 * @api {get} /productTypeAttributes/ Get/Search
 * @apiName GetProductTypeAttributes
 * @apiGroup ProductTypeAttribute
 * @apiUse queryString
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "items": [
 *          {
 *              "id": 2,
 *              "name": "Samsung Galaxy 1",
 *              "product_code": "SMG1",
 *              "product_type_id": 4,
 *              "product_manufacturer_id": 1,
 *              "base_product_id": null,
 *              "description": "Samsung phone",
 *              "images_dir": null,
 *              "rumoured_date": null,
 *              "launch_date": null,
 *              "created_by": 1,
 *              "created_date": "2020-05-13T23:52:25.924Z",
 *              "modified_by": null,
 *              "modified_date": null,
 *              "source": null,
 *              "status": 1
 *      ],
 *      "totalCount": 1
 *  }
 *
 *  @apiUse NotFoundError
 *
 */

/*
/**
 * @api {get} /productTypeAttributes/:id Get by key
 * @apiName GetProductTypeAttribute
 * @apiGroup ProductTypeAttribute
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseProductTypeAttribute
 *
 */

/*
/**
 * @api {delete} /productTypeAttributes/:id Delete by key
 * @apiName DeleteProductTypeAttribute
 * @apiGroup ProductTypeAttribute
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseProductTypeAttribute
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /productTypeAttributes Add item
 * @apiName AddProductTypeAttribute
 * @apiGroup ProductTypeAttribute
 *
 * @apiUse AddModelProductTypeAttribute
 *
 * @apiUse AddOrUpdateResponseProductTypeAttribute
 *
 */

/**
 * @api {put} /productTypeAttributes Update item
 * @apiName UpdateProductTypeAttribute
 * @apiGroup ProductTypeAttribute
 *
 * @apiUse UpdateModelProductTypeAttribute
 *
 * @apiUse AddOrUpdateResponseProductTypeAttribute
 *
 */

/**
 * @api {post} /productTypeAttributes/op/delete Bulk Delete
 * @apiName BulkDeleteProductTypeAttribute
 * @apiGroup ProductTypeAttribute
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseProductTypeAttribute
 */
