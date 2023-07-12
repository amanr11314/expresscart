const express = require('express')
const { addToCart, deleteCartItem, getCart } = require('../controllers/CartController')
const { getAllProducts, getProductDetail } = require('../controllers/ProductController')

const router = express.Router();

router.get('/', getAllProducts)
router.get('/product/details/:productId', getProductDetail)

router.post('/cart', addToCart);
router.get('/cart', getCart);
router.post('/cart/remove', deleteCartItem);

module.exports = router;