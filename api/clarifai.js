const clarifai = require('clarifai');

//On utilise l'app clarifai et sa methode
class ImageProcessing extends clarifai.App {
    constructor(clientID, clientSecret) {
        super(clientID, clientSecret);
    }
    //return a promise
    analyse(base64data) {
        return this.models.predict(clarifai.GENERAL_MODEL, base64data);
    }
}

// instancition d'une nouvelle image
module.exports = new ImageProcessing('clientID', 'clientSecret');
