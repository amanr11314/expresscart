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
    const resp = {
        product: req.product
    }
    console.log(JSON.stringify(resp))
    res.send(resp)
}

exports.createProduct = async (req, res) => {
    const productObj = req.body || {};
    const { title, imgUrl = '#', description = '#', price = 0 } = productObj;
    const resp = await Product.create({
        title,
        description,
        imgUrl,
        price
    })
    res.send(resp)
}

exports.editProduct = async (req, res) => {
    const productObj = req.body || {};
    // const { id = null, ...rest } = productObj;
    // const product = await Product.findOne({ where: { id } });
    const product = req.product

    const updatedProduct = {
        ...product,
        ...productObj
    }
    if (product instanceof Product) {
        const resp = await Product.update(
            updatedProduct,
            { where: { id: product.id } }
        )
        if (((!!resp) === 1)) {
            res.send({
                msg: 'Product updated successfully'
            })
        } else {
            res.send({
                msg: 'Failed to update product'
            })
        }
    }

}

exports.deleteProduct = async (req, res) => {
    // const { id } = req.body || {}
    // const product = await Product.findOne({ where: { id } });
    const product = req.product

    if (product instanceof Product) {
        const resp = await Product.destroy({
            where: {
                id: product.id
            }
        });
        // const resp = await product.destroy();
        if (((!!resp) === 1)) {
            res.send({
                msg: 'Product deleted successfully'
            })
        } else {
            res.send({
                msg: 'Failed to delete product'
            })
        }
    }
}