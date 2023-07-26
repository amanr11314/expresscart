/**
 * @swagger
 * components:
 *   securitySchemas:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         title:
 *           type: string
 *           description: The name of product
 *         description:
 *           type: string
 *           description: The description about product
 *         price:
 *           type: number
 *           description: Price of the product
 *         imgUrl:
 *           type: string
 *           description: Image url of the product
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date at which product was added into database
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The last date at which product detail was updated
 *       example:
 *         id: 58,
 *         title: Oppo reno 5g,
 *         description: gfbghnfh,
 *         price: 223,
 *         imgUrl: file-1689778131181.png,
 *         createdAt: 2023-07-19T14:48:51.198Z,
 *         updatedAt: 2023-07-19T14:48:51.198Z,
 * security:
 *   - bearerAuth: []
 *
 * tags:
 *   name: Products
 *   description: The products managing API
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: >-
 *       Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".
 * /:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get list of all products in table
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of all products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Some server error
 *
 */
// {
//     "products": [
//         {
//             "id": "58",
//             "title": "Oppo reno 5g",
//             "description": "gfbghnfh",
//             "price": 223,
//             "imgUrl": "file-1689778131181.png",
//             "createdAt": "2023-07-19T14:48:51.198Z",
//             "updatedAt": "2023-07-19T14:48:51.198Z",
//             "UserId": null,
//             "User": null
//         },
//         {
//             "id": "61",
//             "title": "iPhone mini 10",
//             "description": "iPhone mini 10",
//             "price": 68000,
//             "imgUrl": "file-1689930105532.jpeg",
//             "createdAt": "2023-07-21T09:01:45.542Z",
//             "updatedAt": "2023-07-21T09:01:45.542Z",
//             "UserId": null,
//             "User": null
//         }
//     ]
// }