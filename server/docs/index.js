
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const products = require('./products')
const cart = require('./cart')
const auth = require('./auth')
// const todos = require('./todos');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    paths: {
        ...products.paths,
        ...cart.paths,
        ...auth.paths
    }
};