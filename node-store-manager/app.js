const express = require('express');
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error')

const app = express();
const port = 5000

// -- Middlewares -- //

//Parse income request body and extract json
app.use(bodyParser.json());

//Products
app.use('/api/products',productsRoutes);

//Users
app.use('/api/users',usersRoutes);

//Any route not found
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

//Error messages handler
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error uccurred.'});
})

//Start Server
app.listen(port);

