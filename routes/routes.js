const express = require('express');
const genres = require('../Genres/routes/index');
const books = require('../Books/routes/index')


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/books', books)
    
}