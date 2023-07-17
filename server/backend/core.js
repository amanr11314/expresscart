const path = require('path')
const express = require('express')
const rootDir = require('./utils/path')
const { authorize } = require('../auth/middleware')

// import routes
const homeRoutes = require('./routes/home')

const app = express();

// middlewares
app.use(authorize)


// use routes 
app.use(homeRoutes)

module.exports = app;