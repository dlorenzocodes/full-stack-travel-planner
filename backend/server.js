const express = require('express');
const app = express();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
require('dotenv').config();

connectDB();

require('./startup/routes')(app);






app.listen(port, () => console.log(`Listening on port ${port}...`));