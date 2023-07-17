const express = require('express')
const { validateProductId } = require('../middlewares/index')
const { check, validationResult } = require('express-validator')
const { addToCart, deleteCartItem, getCart } = require('../controllers/CartController')
const { getAllProducts, getProductDetail, createProduct, editProduct, deleteProduct } = require('../controllers/ProductController')

const router = express.Router();

router.get('/', getAllProducts)
router.get('/product/details/:id', validateProductId, getProductDetail)
router.post('/product/create',
    [
        check('title')
            .not()
            .isEmpty()
            .isLength(4)
            .withMessage("Product Name must be 4 characters or long"),
        check('description')
            .not()
            .isEmpty()
            .isLength(4)
            .withMessage("Product description must be 6 characters or long"),
        check('price')
            .not()
            .isEmpty()
            .isInt({
                min: 1
            })
    ],
    createProduct)
router.post('/product/edit', validateProductId, editProduct)
router.post('/product/delete', validateProductId, deleteProduct)

router.post('/cart', addToCart);
router.get('/cart', getCart);
router.post('/cart/remove', deleteCartItem);

module.exports = router;