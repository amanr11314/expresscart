const path = require('path')
const express = require('express')
const rootDir = require('./utils/path')

// import routes
const homeRoutes = require('./routes/home')

// import models
const { Cart, CartItem, Product, User, sequelize } = require('./models')

// console.log(Object.keys(db))
const app = express();

// middlewares
app.use((req, res, next) => {
    User.findByPk(2).then((user) => {
        req.user = user;

        next();
    })
})


// use routes 
app.use(homeRoutes)

// sync db and Associations
sequelize
    .sync()
    .then((result) => {
        User
            .findByPk(2)
            .then((user) => {
                if (!user) {
                    console.log('No user found');
                } else {
                    console.log(JSON.stringify(user))
                    console.log('User logged in by default');
                }
            })
    })


module.exports = app;