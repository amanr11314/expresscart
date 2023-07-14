const express = require('express')
const { validateProductId } = require('../middlewares/index')
const { addToCart, deleteCartItem, getCart } = require('../controllers/CartController')
const { getAllProducts, getProductDetail, createProduct, editProduct, deleteProduct } = require('../controllers/ProductController')

const router = express.Router();

router.get('/', getAllProducts)
router.get('/product/details/:id', validateProductId, getProductDetail)
router.post('/product/create', createProduct)
router.post('/product/edit', validateProductId, editProduct)
router.post('/product/delete', validateProductId, deleteProduct)

router.post('/cart', addToCart);
router.get('/cart', getCart);
router.post('/cart/remove', deleteCartItem);

module.exports = router;