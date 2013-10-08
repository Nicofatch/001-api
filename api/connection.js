var mongo = require('mongodb');

var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('spotdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'spotdb' database");
        db.collection('maps', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'maps' collection doesn't exist. Creating it with sample data...");
                populateMapsDB();
            }
        });
	db.collection('tags', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'tags' collection doesn't exist. Creating it with sample data...");
                populateTagsDB();
            }
        });
    }
});

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateMapsDB = function() {

    var spots = [
        {
            "title": "paintball75",
            "description": "Un super terrain de paintball",
            "sports": "paintball",
            "longitude": 2.340841,
            "latitude": 48.8650429,
            "_id": "1"
        },
        {
            "title": "cinema de suresnes",
            "description": "Le meilleur cinema du grand Ouest",
            "sports": "cinema",
            "longitude": 2.242201,
            "latitude": 48.8649466,
            "_id": "2"
        },
        {
            "title": "bowling du chaton",
            "description": "Le meilleur bowling pour chats",
            "sports": "bowling",
            "longitude": 2.302201,
            "latitude": 48.9649466,
            "_id": "3"
        }
    ];

    var maps = [
        {
            "title": "Les bars ▒  chat de Paris",
            "description": "Carte des meilleurs bars parisiens dans lesquels votre minou sera chouchouté",
            "tags": ['bar','chat','paris'],
            "contributors_count": "12",
            "markers_count": "63",
            "spots": spots,
            "creationDate": "",
            "modificationDate" : "",
            "private": true
        },
        {
            "title": "Les hotels ▒  chat",
            "description": "Carte des meilleurs hotels pour chat",
            "tags": ['chat','hotel'],
            "contributors_count": "4",
            "markers_count": "15",
            "spots": [],
            "creationDate": "",
            "modificationDate" : "",
            "private": false
        },
        {
            "title": "Les plus beau chats",
            "description": "Spottez votre chat. Trop mignon !!",
            "tags": ['beauté','chat','mignon', 'grraou'],
            "contributors_count": "1274",
            "markers_count": "1274",
            "spots": spots,
            "creationDate": "",
            "modificationDate" : "",
            "private": true
        },
        {
            "title": "Les plus beau chiens",
            "description": "Spottez votre chien. Trop mignon !!",
            "tags": ['beauté','chien','mignon'],
            "contributors_count": "643",
            "markers_count": "643",
            "spots": spots,
            "creationDate": "",
            "modificationDate" : "",
            "private": false
        }];

    db.collection('maps', function(err, collection) {
        collection.insert(maps, {safe:true}, function(err, result) {});
    });

};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateTagsDB = function() {

    var tags = [
	{
	    value:'chat'
	},
	{
	    value:'chaton'
	},
	{
	    value:'chatounette'
	},
	{
	    value:'chatte'
	}
    ];

    db.collection('tags', function(err, collection) {
        collection.insert(tags, {safe:true}, function(err, result) {});
    });

};


exports.db = db;
exports.BSON = BSON;

