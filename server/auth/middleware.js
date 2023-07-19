require('dotenv').config({ path: "/home/csolution/Desktop/AMAN TRAINING/expresscart/server/.env" }); // this is important!
const { User } = require('../backend/models')

const jwt = require("jsonwebtoken");
exports.authorize = async (req, res, next) => {
    console.log('body in authroise', req.body)
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const email = decoded.email;
        const user = await User.findOne({ where: { email } })
        console.log(user)
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized request" });
    }
};

exports.validEmail = async (req, res, next) => {
    const email = req.params?.email || req.body?.email
    if (!!email) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({ message: 'Email already in use' })
        }
    } else {
        res.status(404).json({ message: "Please provide an email" })
    }
}