
const http = require('http');
const app = require('./api/app');


const PORT = 3000;

//requete d'appel au serveur a chaque acces url
const rqHandler = (req, res) => {
    console.log(req.url);
    res.end('Chargement.........');
};

//instanciation et écoute du serveur
const server = http.createServer(rqHandler).listen(PORT, (err) => {
    if (err) {
        return console.log('Une erreur est apparue', err);
    }
    console.log('server is listening on %d', PORT);
});
