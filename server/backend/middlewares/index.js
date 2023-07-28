const { Product } = require('../models')

/**
 * Validate id then find product by id
 * Assign product to req object
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.validateProductId = async (req, res, next) => {

    const id = req.method === 'POST' ?
        (req.path.includes('/cart') ? req.body.productId : req.body?.id)
        : req.params?.id

    // console.log('Route path = ', req.path);
    // '/cart'.includes('/cart')

    // add this middleware in addToCart and deleteCartItem

    if (!!id) {
        const product = await Product.findOne({ where: { id } })
        if (product) {
            req.product = product;
            next();
        } else {
            res.status(404).json({ message: 'No product found with this id: ' + id })
        }
    } else {
        res.status(400).json({ message: "Please provide a Product id to edit" })
    }
}