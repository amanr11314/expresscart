const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express();
const auth = require('./auth/auth')
const backend = require('./backend/core')


// import for db connection
const { User, sequelize } = require('./backend/models')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// sync db and Associations
sequelize
    .sync()
    .then((result) => {
        User
            .findByPk(1)
            .then((user) => {
                if (!user) {
                    console.log('No user found');
                } else {
                    console.log(JSON.stringify(user))
                    console.log('User logged in by default');
                }
            })
    })

app.use(auth)
app.use(backend)

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), function () {
    console.log(`Server listening on port ${app.get('port')}`)
})
