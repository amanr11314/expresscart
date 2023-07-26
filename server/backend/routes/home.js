const express = require('express')
const { validateProductId } = require('../middlewares/index')
const withUploadFile = require("../middlewares/upload")
const { check } = require('express-validator')
const { addToCart, deleteCartItem, getCart, addBulkToCart } = require('../controllers/CartController')
const { getAllProducts, getProductDetail, createProduct, editProduct, deleteProduct } = require('../controllers/ProductController')
const { authorize } = require('../../auth/middleware')
const { thumbnail } = require('../middlewares/thumbnail')


const router = express.Router();

router.get('/product/all', authorize, getAllProducts)
router.get('/product/details/:id', authorize, validateProductId, getProductDetail)
router.post('/product/create', authorize,
    withUploadFile.upload('file'),
    thumbnail,
    createProduct)
// router.post('/product/edit', authorize, validateProductId, withUploadFile.upload('file'), editProduct)
router.post('/product/edit', authorize, withUploadFile.upload('file'), editProduct)
router.post('/product/delete', authorize, validateProductId, deleteProduct)

router.post('/cart', authorize, addToCart);
router.post('/cart/bulk', authorize, addBulkToCart);
router.get('/cart', authorize, getCart);
router.post('/cart/remove', authorize, deleteCartItem);

module.exports = router;