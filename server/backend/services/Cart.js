const db = require('../models')

exports.getCartDetails = (callback) => {
    let cart = { products: [] }
    return callback(cart)
}

exports.addProductToCart = (productId, quantity = 1) => {
    // add product to loggedIn user's cart
    // https://github.com/leelanarasimha/node-express-app/blob/main/models/Cart.js
    this.getCartDetails((cart) => {
        let existingProductIdx = cart.products.findIndex((prod) => prod.id.toString() === productId)
        let updatedProduct;

        if (existingProductIdx !== -1) {
            updatedProduct = { ...cart.products[existingProductIdx] }
            updatedProduct.quantity += quantity;
            cart.products = [...cart.products]
            cart.products[existingProductIdx] = updatedProduct;
        } else {
            updatedProduct = { id: productId, quantity: 1 }
            cart.products = [...cart.products, updatedProduct]
        }
        // cart is the updated cart to save in db
    })
}

exports.deleteProductFromCart = (productId, callBack = '') => {
    this.getCartDetails((cart) => {
        let cartProducts = cart.products;
        let updatedCartProducts = cartProducts.filter((prod) => prod.id.toString() !== productId.toString());


    })
}