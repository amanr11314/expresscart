// const getProducts = require('./get-products');
// const getProduct = require('./get-product');
// const createProduct = require('./create-product')
// const editProduct = require('./edit-product')
// const deleteProduct = require('./delete-product')
const getCart = require('./get-cart')
const addToCart = require('./add-to-cart')

module.exports = {
    paths: {
        '/cart': {
            ...getCart,
            ...addToCart
        },
        // '/cart': {
        //     ...addToCart
        // }
        // '/product/all': {
        //     ...getProducts
        // },
        // '/product/details/{id}': {
        //     ...getProduct
        // },
        // '/product/create': {
        //     ...createProduct
        // },
        // '/product/edit': {
        //     ...editProduct
        // },
        // '/product/delete': {
        //     ...deleteProduct
        // }
    }
}