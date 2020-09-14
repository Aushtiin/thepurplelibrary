const express = require('express');
const genres = require('../Genres/routes/index');


module.exports = function (app) {
    app.use('/api/genres', genres)
}