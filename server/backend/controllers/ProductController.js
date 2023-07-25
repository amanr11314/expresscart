const { Product, User, Op } = require('../models')

exports.getAllProducts = async (req, res) => {
    const query = req.query['search'];
    const sortCol = req.query['col'] || 'updatedAt';
    const sortOrder = req.query['order'] || 'DESC';
    console.log({ sortOrder });
    let products;
    if (query) {
        products = await Product.findAll({
            include: [{ model: User }],
            where: {
                title: {
                    [Op.iLike]: '%' + query + '%'
                }
            },
            order: [
                [sortCol, sortOrder.toUpperCase()],
            ]
        })
    } else {
        products = await Product.findAll({
            include: [{ model: User }],
            order: [
                [sortCol, sortOrder.toUpperCase()],
            ]
        })
    }

    const resp = {
        products
    }

    res.send(resp)
}

exports.getProductDetail = async (req, res) => {
    const resp = {
        product: req.product
    }
    res.send(resp)
}

exports.createProduct = async (req, res) => {
    const productObj = req.body || {};
    console.log(req)
    let path = '#'
    if (req.file) {
        path = req.file.filename;
    }
    const { title, description = '#', price = 0 } = productObj;
    const resp = await Product.create({
        title,
        description,
        imgUrl: path,
        price
    })
    res.send(resp)
}

exports.editProduct = async (req, res) => {
    const productObj = req.body || {};

    let path = '#'
    if (req.file) {
        path = req.file.filename;
        productObj['imgUrl'] = path;
    }

    const updatedProduct = {
        // ...product,
        ...productObj
    }
    // if (product instanceof Product) {
    const resp = await Product.update(
        updatedProduct,
        { where: { id: productObj.id } }
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
    // }

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