const express = require('express');
const genres = require('../Genres/routes/index');
const books = require('../Books/routes/index');
const user = require('../Users/routes/index');
const customer = require('../Customers/routes/index');
const purchases = require('../Purchases/routes/index');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/books', books);
    app.use("/api/user", user);
    app.use('/api/customers', customer);
    app.use('/api/purchases', purchases); 
}