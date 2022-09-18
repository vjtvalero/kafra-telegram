const dotenv = require('dotenv');
dotenv.config();
const telegram = require('./bot');
telegram.start();
