const mongoose  = require('mongoose');
const Img       = require('./models/image');

mongoose.Promise = Promise;

//connecting the database
mongoose.connect('mongodb://localhost:27017/images');

module.exports = Img;