const db = require('../models')

exports.getCartDetails = (callback) => {
    let cart = { products: [] }
    return callback(cart)
}

exports.addProductToCart = (productId, price) => {
    // add product to loggedIn user's cart
    // https://github.com/leelanarasimha/node-express-app/blob/main/models/Cart.js
    this.getCartDetails((cart) => {
        let existingProductIdx = cart.products.findIndex((prod) => prod.id.toString() === productId)
        let updatedProduct;

        if (existingProductIdx !== -1) {
            updatedProduct = { ...cart.products[existingProductIdx] }
            updatedProduct.quantity += 1;
            cart.products = [...cart.products]
            cart.products[existingProductIdx] = updatedProduct;
        } else {
            updatedProduct = { id: productId, quantity: 1 }
            cart.products = [...cart.products, updatedProduct]
        }

    })
}