var tags = require('./tags.js');

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving map with _id = [ ' + id + ']');
    db.collection('maps', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            // Wrap the location in a root element called "spot".
            res.json(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('maps', function(err, collection) {
        collection.find().toArray(function(err, items) {
	    res.send(items);
        });
    });
};

exports.add = function(req, res) {
    var map = req.body;
    map.creationDate = new Date();
    map.modificationDate = new Date();
    console.log('Adding map: ' + JSON.stringify(map));
    db.collection('maps', function(err, collection) {
        collection.insert(map, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
		//update tags
		for (var i=0,l=map.tags.length;i<l;i++) {
		    tags.addIfNew(map.tags[i]);
		}
            }
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var map = req.body;
    map.modificationDate = new Date();
    console.log('Updating map: ' + id);
    console.log(JSON.stringify(map));
    db.collection('maps', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, map, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating map: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                map._id = id;
		res.send(map);
		//update tags
		for (var i=0,l=map.tags.length;i<l;i++) {
		    tags.addIfNew(map.tags[i]);
		}
            }
        });
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting map: ' + id);
    db.collection('maps', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send({});
            }
        });
    });
};

