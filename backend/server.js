const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');

connectDB();

require('./startup/routes')(app);





const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));