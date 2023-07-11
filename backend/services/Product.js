const db = require('../models')
// sequelize.query(
//     'SELECT * FROM students WHERE id = :id',
//     {
//         replacements: { id: 2 },
//         type: sequelize.QueryTypes.SELECT
//     }
// ).then(result => {
//     console.log(result);
// }).catch((error) => {
//     console.error('Failed to insert data : ', error);
// });

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
const sample = { "id": "1", "title": "Apple iPhone 14 Pro Plus", "description": "iOS14 with A22 bionic chip", "price": 199999, "imgUrl": null, "createdAt": "2023-07-11T07:34:34.402Z", "updatedAt": "2023-07-11T07:34:34.402Z" };

exports.updateProductById = (product, productId) => {
    return db.Product.update(product, {
        where: {
            id: productId
        }
    })
}

// db.User.findAll().then((data) => console.log(JSON.stringify(data)))
this.getProductById(10)
    .then((data) => console.log(JSON.stringify(data)))
    .catch((err) => console.log(`erorr not found ${err}`))