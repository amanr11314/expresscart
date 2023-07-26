
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const products = require('./products')
// const todos = require('./todos');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...products
    // ...todos
};