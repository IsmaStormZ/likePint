const express    = require('express');
const multer     = require('multer');
const clarifai   = require('clarifai');
const fs         = require('fs');           // on lit les images
const Img        = require('../db');        // Persistence des donnees

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
    //on verifie les photos
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

                    // saauve en base
                    const imageData = new Img (imageObject);
                    imageData.save();

                    //on vérifie l'envoi de chaque images grace a la réponse
                    if (message.data.length === req.files.length) {
                        res.status(200).send(message)
                    }
                },
                    err => console.error(err)
                );
        });
    });
});

//Method GET pour récupérer toute les images
app.get('/photos', (req, res, next) => {
    Img.find({}, (err, images) => res.send(images));
    next();
});


//Method GET pour récupérer l'image par les tags
app.get('/photos/:tag', (req, res, next) => {
    Img.find({ tags: req.params.tag }, (err, images) => res.send(images));
    next();
}) ;

// récupérer les tags depuis CLarifay API
const serialize  = (array) => {
    let subjects = [];
    array.forEach((element) => {
        subjects.push(element.name)
    });
    //Retour de 3 résultats
    return subjects.slice(0,3)
};

module.exports = app;
