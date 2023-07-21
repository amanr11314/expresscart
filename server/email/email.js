const express = require("express");

// Express APIs
const emailRoutes = require("./routes");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(emailRoutes);

module.exports = app;