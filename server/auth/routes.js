require('dotenv').config({ path: "/home/csolution/Desktop/AMAN TRAINING/expresscart/server/.env" }); // this is important!

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require('../backend/models')
const { authorize, validEmail } = require("./middleware");
const { validationResult } = require("express-validator");

const cors = require("cors");
// CORS OPTIONS
var whitelist = ["http://localhost:4200", "http://localhost:4000"];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        };
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions);
};

// Sign-up
router.post("/register", validEmail, async (req, res, next) => {
    // const err = validationResult(req);
    // if (err.isEmpty()) {
    console.log('inside register');
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log('hash=', hash);
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
    })
    console.log('new user', user);
    if (user) {
        console.log('user created successfully');
        res.status(201).json({
            message: "User successfully created!",
            result: user,
        });
    } else {
        console.log('somthing went wrong');
        res.status(500).json({
            error: 'something went wrong',
        });
    }
});


// Sign-in
router.post("/signin", (req, res, next) => {
    let getUser;



    try {
        User.findOne({
            where: { email: req.body.email, }
        })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({
                        message: "No user found with this email",
                    });
                }
                getUser = user;
                return bcrypt.compare(req.body.password, user.password);
            })
            .then((response) => {
                console.log(response);
                if (!response) {
                    return res.status(401).json({
                        message: "Incorrect password",
                    });
                }
                let jwtToken = jwt.sign(
                    {
                        email: getUser.email,
                        userId: getUser.id,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );
                res.status(200).json({
                    token: jwtToken,
                    expiresIn: 3600,
                    id: getUser.id,
                });
            })
    }
    catch (err) {
        console.log('Error');
        return res.status(401).json({
            message: "Authentication failed" + err,
        });
    };
});

// Get Single User
router.route("/user/:id").get(authorize, async (req, res, next) => {

    const id = req.params?.id || req.body?.id
    User.findOne({
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        where: { id }
    })
        .then((result) => {
            res.json({
                data: result,
                message: "Data successfully retrieved.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;