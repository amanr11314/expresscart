const { Product, Op } = require('../models')

/**
 * Validate id then find product by id
 * Assign product to req object
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.validateProductId = async (req, res, next) => {

    const isBulk = req.path.includes('/bulk')

    try {
        if (isBulk) {
            // handle bulk productIds case
            const productIds = (req.method === 'POST') && req.path.includes('/cart/bulk') && req.body ? (req.body.productIds || []) : []

            if (productIds && productIds.length) {
                // Fetch the products from the database based on the provided productIds
                const products = await Product.findAll({
                    attributes: ['id'],
                    where: {
                        id: {
                            [Op.in]: productIds
                        }
                    }
                });

                // Check if all productIds were found in the database
                const foundProductIds = products.map(product => product.id);
                const missingProductIds = productIds.filter(productId => !foundProductIds.includes(productId));

                if (missingProductIds.length > 0) {
                    // Throw an error if some productIds are missing
                    return res.status(404).send({ message: 'Some products do not exist in the database: ' + missingProductIds });
                } else {
                    next();
                }
            } else {
                res.status(400).json({ message: "No product ids found" })
            }
        } else {
            // handle single product id case
            const id = req.method === 'POST' ?
                (req.path.includes('/cart') ? req.body.productId : req.body?.id)
                : req.params?.id


            // console.log('Route path = ', req.path);
            // '/cart'.includes('/cart')

            // add this middleware in addToCart and deleteCartItem

            if (!!id) {
                const product = await Product.findOne({
                    where: { id }
                })
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
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            internal_code: 500
        })
    }
}