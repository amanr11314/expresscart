const { Product, User } = require('../models')

exports.getAllProducts = async (req, res) => {
    const products = await Product.findAll({ include: [{ model: User }] })

    console.log(products)
    const resp = {
        products
    }

    res.send(resp)
}

exports.getProductDetail = async (req, res) => {
    const productId = req.params.productId

    const product = await Product.findOne({ where: { id: productId } })

    const resp = {
        product
    }

    console.log(JSON.stringify(resp))

    res.send(resp)

}