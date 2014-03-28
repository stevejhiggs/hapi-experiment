var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var db;

var MONGODB_URI = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGODB_URI, {}, function (err, database) {
   if(err) return next(err);
  	db = database;
  	module.exports.db = db;
  	module.exports.ObjectID = ObjectID;
  });


