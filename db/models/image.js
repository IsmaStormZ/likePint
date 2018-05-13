const mongoose  = require('mongoose');

//construction de notre schema pour la db
const imageSchema = mongoose.Schema({
    path : String,
    tags:  [String]
});

//attribution property schema into a model
const Img = mongoose.model('Img', imageSchema);

module.exports = Img;