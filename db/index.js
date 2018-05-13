const mongoose  = require('mongoose');
const Img       = require('./models/image');

mongoose.Promise = Promise;

//connection a la base db
mongoose.connect('mongodb://localhost:27017/images');

module.exports = Img;
