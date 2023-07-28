// const getCart = require('./get-cart')
// const addToCart = require('./add-to-cart')
// const deleteCartItem = require('./delete-from-cart')
// const addBulkToCart = require('./add-bulk-to-cart')
const signIn = require('./signIn')
const logout = require('./logout')
const register = require('./register')
const token = require('./token')
const user = require('./user')

module.exports = {
    paths: {
        '/auth/signin': {
            ...signIn
        },
        '/auth/register': {
            ...register
        },
        '/auth/logout': {
            ...logout
        },
        '/auth/token': {
            ...token
        },
        '/auth/user/{id}': {
            ...user
        },
    }
}