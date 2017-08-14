
const http = require('http');
const app = require('./api/app');


const PORT = 3000;

//request to call a server each time to access url
const rqHandler = (req, res) => {
    console.log(req.url);
    res.end('Loading.........');
};

//instantiate and listen our server
const server = http.createServer(rqHandler).listen(PORT, (err) => {
    if (err) {
        return console.log('something wrong happened', err);
    }
    console.log('server is listening on %d', PORT);
});




