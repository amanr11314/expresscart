const express = require('express')
const cors = require('cors')

const morgan = require('morgan')

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
require('dotenv').config()
const docs = require('./docs')

const app = express();
const auth = require('./auth/auth')
const backend = require('./backend/core')
const email = require('./email/email')
const multer = require("multer")


// import for db connection
const { User, sequelize } = require('./backend/models')

app.use(morgan("dev"));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/public`))
app.use('/thumbnails', express.static(`${__dirname}/public/thumbnails`))

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
                    console.log('User logged in by default');
                }
            })
    })

app.use(auth)
app.use(backend)
app.use(email)

app.set('port', process.env.PORT || 3000)

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Expresscart API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    // apis: ["./routes/*.js"],
    apis: [
        "./auth/routes.js",
        "./backend/docs.js"
    ]
};
// const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(docs)
);


app.listen(app.get('port'), function () {
    console.log(`Server listening on port ${app.get('port')}`)
})
