const getCart = require('./get-cart')
const addToCart = require('./add-to-cart')
const deleteCartItem = require('./delete-from-cart')
const addBulkToCart = require('./add-bulk-to-cart')

module.exports = {
    paths: {
        '/cart': {
            ...getCart,
            ...addToCart,
        },
        '/cart/remove': {
            ...deleteCartItem
        },
        '/cart/bulk': {
            ...addBulkToCart
        }
    }
}