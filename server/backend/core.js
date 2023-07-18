const path = require('path')
const express = require('express')
const rootDir = require('./utils/path')

// import routes
const homeRoutes = require('./routes/home')

const app = express();



// use routes 
app.use(homeRoutes)

module.exports = app;