const clarifai = require('clarifai');

//Using clarifai app and implements our method (ES6 features)
class ImageProcessing extends clarifai.App {
    constructor(clientID, clientSecret) {
        super(clientID, clientSecret);
    }
    //return a promise
    analyse(base64data) {
        return this.models.predict(clarifai.GENERAL_MODEL, base64data);
    }
}

// instantiate a new image with clientId and clientSecret
module.exports = new ImageProcessing('clientID', 'clientSecret');
