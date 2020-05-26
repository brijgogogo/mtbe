const GenericDb = require("../db/genericDb");
const schema = require("../db/schemas/product");
const genericRouter = require("./genericRouter");
// const logger = require("../utils/logger");

// logger.info(schema, "product schema");
const genericDb = new GenericDb(schema);
const router = genericRouter(genericDb);
module.exports = router;

/**
 * @apiDefine AddModelProduct
 * @apiParam {Object} RequestObject Items to add and user id in format:
 *
 *    {
 *      "items": [
 *          {
 *            "name": "Samsung Galaxy 1",
 *            "code": "SMG1",
 *            "productTypeId": 1,
 *            "productManufacturerId": 1,
 *            "description": "Samsung phone"
 *          }
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine UpdateModelProduct
 * @apiParam {Object} RequestObject Items to update and user id in format:
 *
 *    {
 *      "items": [
 *          {
 *            "id": 1,
 *            "name": "Samsung Galaxy 1",
 *            "code": "SMG1",
 *            "productTypeId": 1,
 *            "productManufacturerId": 1,
 *            "description": "Samsung phone"
 *          }
 *      ],
 *      "userId": 1
 *    }
 */

/**
 * @apiDefine AddOrUpdateResponseProduct
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *   {
 *      "items": [
 *        {
 *      {
 *          "id": 3,
 *          "name": "Samsung Galaxy 1",
 *          "code": "SMG1",
 *          "description": "Samsung phone",
 *          "imagesDir": null,
 *          "launchDate": null,
 *          "isLaunched": null,
 *          "productTypeId": 1,
 *          "productManufacturerId": 1,
 *          "baseProductId": null,
 *          "crtBy": 1,
 *          "crtAt": "2020-05-24T23:00:00.000Z",
 *          "modAt": null,
 *          "modBy": null,
 *          "source": null,
 *          "state": 1
 *      }
 *        }
 *      ]
 *  }
 */

/**
 * @apiDefine GetByKeyOrDeleteResponseProduct
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *        {
 *          "id": 3,
 *          "name": "Samsung Galaxy 1",
 *          "code": "SMG1",
 *          "description": "Samsung phone",
 *          "imagesDir": null,
 *          "launchDate": null,
 *          "isLaunched": null,
 *          "productTypeId": 1,
 *          "productManufacturerId": 1,
 *          "baseProductId": null,
 *          "crtBy": 1,
 *          "crtAt": "2020-05-24T23:00:00.000Z",
 *          "modAt": null,
 *          "modBy": null,
 *          "source": null,
 *          "state": 1
 *        }
 *  ]
 */

/*
/**
 * @api {get} /products/ Get/Search
 * @apiName GetProducts
 * @apiGroup Product
 * @apiUse queryString
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "items": [
 *        {
 *          "id": 3,
 *          "name": "Samsung Galaxy 1",
 *          "code": "SMG1",
 *          "description": "Samsung phone",
 *          "imagesDir": null,
 *          "launchDate": null,
 *          "isLaunched": null,
 *          "productTypeId": 1,
 *          "productManufacturerId": 1,
 *          "baseProductId": null,
 *          "crtBy": 1,
 *          "crtAt": "2020-05-24T23:00:00.000Z",
 *          "modAt": null,
 *          "modBy": null,
 *          "source": null,
 *          "state": 1
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
 * @api {get} /products/:id Get by key
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Key of item to get.
 *
 * @apiUse GetByKeyOrDeleteResponseProduct
 *
 */

/*
/**
 * @api {delete} /products/:id Delete by key
 * @apiName DeleteProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id  Key of item to delete.
 *
 * @apiUse GetByKeyOrDeleteResponseProduct
 *
 * @apiUse DeleteNotFound
 */

/**
 * @api {post} /products Add item
 * @apiName AddProduct
 * @apiGroup Product
 *
 * @apiUse AddModelProduct
 *
 * @apiUse AddOrUpdateResponseProduct
 *
 */

/**
 * @api {put} /products Update item
 * @apiName UpdateProduct
 * @apiGroup Product
 *
 * @apiUse UpdateModelProduct
 *
 * @apiUse AddOrUpdateResponseProduct
 *
 */

/**
 * @api {post} /products/op/delete Bulk Delete
 * @apiName BulkDeleteProduct
 * @apiGroup Product
 *
 * @apiUse BulkDelete
 *
 * @apiUse AddOrUpdateResponseProduct
 */
