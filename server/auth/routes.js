require('dotenv').config({ path: "/home/csolution/Desktop/AMAN TRAINING/expresscart/server/.env" }); // this is important!

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require('../backend/models')
const { authorize, validEmail } = require("./middleware");
const { validationResult } = require("express-validator");

let refreshTokens = []
const NOT_FOUND = "NOT_FOUND";

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
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        })
        if (user) {
            console.log('user created successfully');
            res.status(201).json({
                message: "User successfully created!",
                result: user,
            });
        } else {
            console.log('somthing went wrong');
            res.status(500).json({
                message: 'something went wrong',
            });
        }
    } catch (error) {
        console.log('Error');
        return res.status(500).json({
            message: "Authentication failed" + err?.message,
            internal_code: 500
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
                if (!user)
                    throw NOT_FOUND
                // return res.status(401).json({
                //     message: "No user found with this email",
                // });
                console.log('not executed if user not found');
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
                // generate refresh token too at login
                let refreshToken = jwt.sign(
                    {
                        email: getUser.email,
                        userId: getUser.id,
                    },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: "5d",
                    }
                )
                refreshTokens.push(refreshToken)
                res.status(200).json({
                    token: jwtToken,
                    refreshToken,
                    expiresIn: 3600,
                    id: getUser.id,
                });
            })
            .catch((err) => {
                if (err === NOT_FOUND) {
                    console.log('Error:', err.message);
                    return res.status(401).json({
                        message: "No user found with this email",
                    });
                } else {
                    return res.status(500).json({
                        message: "Authentication failed" + err?.message,
                        internal_code: 500,
                    });
                }
            });
    } catch (err) {
        console.log('outer catch: ', err);

        console.log('Error');
        return res.status(500).json({
            message: "Authentication failed" + err?.message,
            internal_code: 500
        });
    };
});

router.post("/token", (req, res, next) => {
    // cureent refreshToken
    try {
        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(401)
        if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            const accessToken = jwt.sign(
                {
                    email: user.email,
                    userId: user.id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            return res.status(200).json({ accessToken, refreshToken })
        })
    } catch (error) {
        console.log('Error');
        return res.status(500).json({
            message: "Authentication failed" + err?.message,
            internal_code: 500
        });
    }
})

router.post('/logout', (req, res) => {
    try {
        refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        res.sendStatus(204);
    } catch (err) {
        console.log('Error');
        return res.status(500).json({
            message: err?.message,
            internal_code: 500
        });
    };
})

// Get Single User
router.route("/user/:id").get(authorize, async (req, res, next) => {

    try {
        const id = req.params?.id || req.body?.id
        const result = await User.findOne({
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
            where: { id }
        })
        if (!result) {
            return res.status(404).json({ message: 'No user found with this id: ' + id })
        }
        res.status(200).json({
            data: result,
            message: "Data successfully retrieved.",
            status: 200,
        });
    } catch (error) {
        console.log('Error');
        return res.status(500).json({
            message: err?.message,
            internal_code: 500
        });
    }
});

module.exports = router;