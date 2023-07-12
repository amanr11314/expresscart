const { Product } = require('../models')

exports.getCart = async (req, res) => {
    const cart = await req?.user?.getCart();
    const cartProducts = await cart?.getProducts();

    let totaAmount = 0;
    if (cartProducts) {
        cartProducts.forEach((product) => {
            totaAmount += +product.cartItem.quantity * +product.price
        })
    }

    const resp = {
        cartProducts,
        totaAmount
    }

    res.send(resp)
}

exports.addToCart = async (req, res) => {

    const productId = req.body.productId
    let newQuantity = 1;

    let cart = await req?.user?.getCart();

    if (!cart) {
        cart = await req?.user.createCart();
    }

    let fetchedCart = cart;
    const cartProducts = await cart?.getProducts({
        where: { id: productId }
    });

    let product;
    if (cartProducts.length) {
        newQuantity = cartProducts[0].cartItem.quantity + 1;
        product = cartProducts[0];
    }

    const data = await fetchedCart.addProduct(product, {
        through: {
            quantity: newQuantity
        }
    })

    const resp = {
        data
    }

    res.send(resp)

}

exports.deleteCartItem = async (req, res) => {
    const productId = req.body.productId;
    const fetchedCart = await req?.user?.getCart();
    const product = await Product.findByPk(productId)

    const data = await fetchedCart.removeProduct(product)

    const resp = {
        msg: 'Iten removed from cart'
    }

    res.send(resp)
}