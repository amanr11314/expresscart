const { Product, User, Op } = require('../models')

exports.getAllProducts = async (req, res) => {
    const query = req.query['search'];
    const sortCol = req.query['col'] || 'updatedAt';
    const sortOrder = req.query['order'] || 'DESC';
    console.log({ sortOrder });
    let products;

    try {
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

        if (products.length > 0) {
            res.status(200).json(resp)
        } else {
            res.status(204).json({
                msg: "No product found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            internal_code: 500
        })
    }
}

exports.getProductDetail = async (req, res) => {
    if (req.product) {
        const resp = {
            product: req.product
        }
        res.status(200).json(resp)
    } else {
        res.status(500).json({
            message: 'Something went wrong',
            internal_code: 500
        })
    }
}

exports.createProduct = async (req, res) => {
    const productObj = req.body || {};
    console.log(req)
    let path = '#'
    if (req.file) {
        path = req.file.filename;
    }
    const { title, description = '#', price = 0 } = productObj;
    try {
        const resp = await Product.create({
            title,
            description,
            imgUrl: path,
            price
        })
        res.status(200).json(resp)
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            internal_code: 500
        })
    }
}

exports.editProduct = async (req, res) => {
    const productObj = req.body || {};
    // check why edit file is not uploading
    let path = '#'
    if (req.file) {
        console.log('found file: ', req.file.filename);
        path = req.file.filename;
        productObj['imgUrl'] = path;
    }

    const updatedProduct = {
        // ...product,
        ...productObj
    }

    try {
        const resp = await Product.update(
            updatedProduct,
            { where: { id: productObj.id } }
        )
        console.log('resp = ', resp?.[0]);
        if ((!!resp) && (!!resp?.[0])) {
            res.status(204).json({
                msg: 'Product updated successfully',
            })
        } else {
            res.status(500).json({
                message: 'Failed to update product',
                internal_code: 500
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            internal_code: 500
        })
    }

}

exports.deleteProduct = async (req, res) => {
    const product = req.product

    try {
        const resp = await Product.destroy({
            where: {
                id: product.id
            }
        });
        console.log('resp delete = ', typeof resp);
        if ((!!resp) && (resp === 1)) {
            res.status(204).json({
                msg: 'Product deleted successfully'
            })
        } else {
            res.status(500).json({
                message: 'Failed to delete product',
                internal_code: 500
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            internal_code: 500
        })
    }

}