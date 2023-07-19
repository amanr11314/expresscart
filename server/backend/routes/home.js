const express = require('express')
const { validateProductId } = require('../middlewares/index')
const withUploadFile = require("../middlewares/upload")
const { check } = require('express-validator')
const { addToCart, deleteCartItem, getCart } = require('../controllers/CartController')
const { getAllProducts, getProductDetail, createProduct, editProduct, deleteProduct } = require('../controllers/ProductController')
const { authorize } = require('../../auth/middleware')


const router = express.Router();

router.get('/', authorize, getAllProducts)
router.get('/product/details/:id', authorize, validateProductId, getProductDetail)
router.post('/product/create', authorize,
    withUploadFile.upload('file'),
    createProduct)
// router.post('/product/edit', authorize, validateProductId, withUploadFile.upload('file'), editProduct)
router.post('/product/edit', authorize, withUploadFile.upload('file'), editProduct)
router.post('/product/delete', authorize, validateProductId, deleteProduct)

router.post('/cart', authorize, addToCart);
router.get('/cart', authorize, getCart);
router.post('/cart/remove', authorize, deleteCartItem);

module.exports = router;