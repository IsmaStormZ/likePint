const express    = require('express');
const multer     = require('multer');
const clarifai   = require('clarifai');
const fs         = require('fs');           // read image thanks to the module in NodeJs
const Img        = require('../db');        // Persistence of data

const str = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './pics')
    },
    filename:(req, file, cb) => {
        cb(null, '${Date.now()}.${file.mimetype.split('/')[1]}');
    }
});

const pic = multer({ str });
const app = express();

app.post('/photos/pic', pic.array('photos'), (req, res, next) => {
    //check photos
    const message = {"data": [] };
    req.files.forEach(image => {
        fs.readFile(image.path, (err,data) => {

            clarifai.analyse(new Buffer(data).toString('base64'))
                .then(res => {
                    const imageObject = {
                        'image': {
                            'path': image.path,
                            'tags': serialize( res.outputs[0].data.concepts)
                        }
                    };
                        message.data.push(imageObject);

                    // save in database
                    const imageData = new Img (imageObject);
                    imageData.save();

                    //check if every image has been processed send back the response
                    if (message.data.length === req.files.length) {
                        res.status(200).send(message)
                    }
                },
                    err => console.error(err)
                );
        });
    });
});

//Method GET to get all images
app.get('/photos', (req, res, next) => {
    Img.find({}, (err, images) => res.send(images))
    next();
});


//Method GET to get images by tags
app.get('/photos/:tag', (req, res, next) => {
    Img.find({ tags: req.params.tag }, (err, images) => res.send(images));
    next();
}) ;

// get tags from CLarifay API
const serialize  = (array) => {
    let subjects = [];
    array.forEach((element) => {
        subjects.push(element.name)
    });
    //Returning 3 results
    return subjects.slice(0,3)
};

module.exports = app;