const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const connection = {};
var dbObject = {};
const dbName = 'dbToDo';

connection.connect = callback => {
  MongoClient.connect(
    url,
    { useUnifiedTopology: true },
    {useNewUrlParser: true},
    (err, database) => {
      if (err) {
        console.log(err);
        callback('Error While Connecting To Db');
      } else {
        dbObject = database.db(dbName);
        callback(null, 'Database Connected');
      }
    }
  );
};

connection.getDb = () => {
  if (dbObject) {
    return dbObject;
  }
};

module.exports = connection;
