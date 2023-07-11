const db = require('../models')

exports.saveProduct = (product) => {
    // Create a new Product
    return db.Product.create(product);
}

exports.fetchAllProducts = () => {
    return db.Product.findAll();
}

exports.getProductById = (productId) => {
    return db.Product.findOne({
        where: {
            id: productId
        }
    })
}

exports.updateProductById = (product, productId) => {
    return db.Product.update(product, {
        where: {
            id: productId
        }
    })
}

exports.deleteProductById = (productId) => {
    return db.Product.destroy({
        where: {
            id: productId
        }
    })
}

// // db.User.findAll().then((data) => console.log(JSON.stringify(data)))
// const newProduct = {
//     title: 'Nothing Phone 2',
//     description: 'New Nothing Phone with awesome features',
//     price: 89000,
//     createdAt: "2023-07-11T07:34:34.402Z",
//     updatedAt: "2023-07-11T07:34:34.402Z",
// }

// this.deleteProductById(1)
//     .then((data) => console.log(JSON.stringify(data)))
//     .catch((err) => console.log(`erorr not found ${err}`))

// this.saveProduct(newProduct)
//     .then((data) => console.log(JSON.stringify(data)))
//     .catch((err) => console.log(`erorr not found ${err}`))

// this.getProductById(10)
//     .then((data) => console.log(JSON.stringify(data)))
//     .catch((err) => console.log(`erorr not found ${err}`))