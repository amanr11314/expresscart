const { Product } = require('../models')

/**
 * Validate id then find product by id
 * Assign product to req object
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.validateProductId = async (req, res, next) => {
    console.log('body in validateProductId', req.body)

    const id = req.method === 'POST' ? req.body?.id : req.params?.id
    console.log('id = ', id)
    console.log('body = ', JSON.stringify(req.body))
    if (!!id) {
        const product = await Product.findOne({ where: { id } })
        if (product) {
            req.product = product;
            next();
        } else {
            res.status(404).json({ message: 'No product found with this id: ' + id })
        }
    } else {
        res.status(404).json({ message: "Please provide a Product id to edit" })
    }
}