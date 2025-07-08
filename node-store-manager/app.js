const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error')

const app = express();
const port = process.env.PORT || 3333

// -- Middlewares -- //

//Parse income request body and extract json
app.use(bodyParser.json());

//Products
app.use('/api/products', productsRoutes);

//Users
app.use('/api/users', usersRoutes);

//Any route not found
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

//Error messages handler
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error uccurred.' });
})

//Start Database and Server
mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.fssmiij.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Database connected successfully!')
        app.listen(port);
    })
    .catch(error => {
        console.log(error)
    });


