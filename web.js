var express = require('express');
var maps = require('./api/maps');
var tags = require('./api/tags');
var app = express();
//app.use(express.logger());

var connection = require('./api/connection.js');

// global variables
BSON = connection.BSON;
db = connection.db;

app.use(function(req,res,next) {
    console.log('%s %s', req.method, req.url);
    next();
});

app.use(express.methodOverride());

app.use(express.bodyParser());

// ## CORS middleware
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

//API
/*app.get('/api/spots',spot.findAll);
app.get('/api/spots/:id',spot.findById);
app.post('/api/spots',spot.add);
app.put('/api/spots/:id',spot.update);
app.delete('/api/spots/:id',spot.delete);*/

app.get('/api/maps',maps.findAll);
app.get('/api/maps/:id',maps.findById);
app.post('/api/maps',maps.add);
app.put('/api/maps/:id',maps.update);
app.delete('/api/maps/:id',maps.delete);

app.get('/api/tags',tags.findAll);
app.get('/api/tags/search',tags.findByValue);
app.get('/api/tags/:id',tags.findById);
app.post('/api/tags',tags.add);
app.put('/api/tags/:id',tags.update);
app.delete('/api/tags/:id',tags.delete);


var port = process.env.PORT || 5001;
app.listen(port, function() {
  console.log("Listening on " + port);
});
