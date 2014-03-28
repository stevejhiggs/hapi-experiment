var pmongo = require('promised-mongo');
var db;

/*module.exports.Register = function(err, db, uri, config){
	MongoClient.connect(uri, config, function (err, database) {
	   if(err) return next(err);
	  	db = database;
	  	module.exports.db = db;
	  	module.exports.ObjectID = ObjectID;
	  });
};*/

db = pmongo('test');
module.exports.db = db;
module.exports.ObjectId = pmongo.ObjectId;


