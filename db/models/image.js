const mongoose  = require('mongoose');

//build our schema for db
const imageSchema = mongoose.Schema({
    path : String,
    tags:  [String]
});

//attribution property schema into a model
const Img = mongoose.model('Img', imageSchema);

module.exports = Img;