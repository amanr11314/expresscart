const express = require("express");

// Express APIs
const authRoutes = require("./routes");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Serve static resources
app.use("/auth", authRoutes);

module.exports = app;