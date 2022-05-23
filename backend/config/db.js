const mongoose = require('mongoose');
const { logger } = require('./logger');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        logger.info(`MongoDb connected: ${conn.connection.host}`);

    }catch(err){
        logger.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;