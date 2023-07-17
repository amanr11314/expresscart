const express = require("express");

// Express APIs
const authRoutes = require("./routes");
const app = express();


// Serve static resources
app.use("/auth", authRoutes);

module.exports = app;