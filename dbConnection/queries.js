var dbObject = require('./connection.js');
var db = dbObject.getDb;

var queries = {};

// ----Dashboard Queries Starts Here---- //

/**
 * This method is used for insert in todoList.
 * @method insertToDoList
 * @author Abhishek Singh
 */
queries.insertToDoList = function insertToDoList(data, callback) {
  db().collection('todoTask').insertOne(data, (err, result) => {
    callback(err, result);
  });
};

/**
* This method is used to get the todo list.
* @method findToDoList
* @author ABHISHEK SINGH
*/
queries.findToDoList = function findToDoList(query, cb) {
  db().collection('todoTask').find(query)
    .toArray((err, result) => {
      cb(err, result);
    });
};

/**
* This method is used to delete the todo list.
* @method deleteToDoList
* @author ABHISHEK SINGH
*/
queries.deleteToDoList = function deleteToDoList(query, cb) {
  db().collection('todoTask').deleteOne(query, (err, result) => {
    cb(err, result);
  });
};

/**
* This method is used to update the todo list.
* @method changeToDoList
* @author ABHISHEK SINGH
*/
queries.changeToDoList = function changeToDoList(query, toUpdate, cb) {
  db().collection('todoTask').updateOne(query, toUpdate, (err, result) => {
    cb(err, result);
  });
};



module.exports = queries;
