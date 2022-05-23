const express = require('express');
const app = express();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { logger } = require('./config/logger');

connectDB();

require('./startup/routes')(app);


app.listen(port, () => logger.info(`Listening on port ${port}...`));