const mongoose = require('mongoose');
const logger = require('./logger');

const mongodb = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
       // useFindAndModify: true,
    })
    logger.info(`MongoDB Connected: ${connect.connection.host}`);
}

module.exports = mongodb;