const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const userRoutes = require("./routes/user");
const requestsRoutes = require("./routes/requests");
const chatsRoutes = require("./routes/chats");

const app = express();

mongoose.connect("mongodb+srv://maram:GXjsuBDCyoMqtSks@cluster0-74wfz.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected to database');
    })
    .catch(() => {
        console.log('failed to connet');
    }); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/user", userRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/chats", chatsRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;