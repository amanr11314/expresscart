const path = require('path')
const express = require('express')
const rootDir = require('./backend/utils/path')
require('dotenv').config()

const app = express();
const backend = require('./backend/core')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(backend)


app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), function () {
    console.log(`Server listening on port ${app.get('port')}`)
})
