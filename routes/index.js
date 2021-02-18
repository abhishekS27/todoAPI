/*
 * @Author: Abhishek Singh
 * @Date:   2020-28-18 10:52 AM
 */

const express = require('express');
const toDoManagement =require('./toDoManagement.js');

const router = express.Router();


/*
API for adding the todo list.
@author Abhishek Singh
*/
router.post('/addToDo', (req, res) => {
    toDoManagement.addToDoList(req, res);
});

/*
API for get all the todo and specific.
@author Abhishek Singh
*/
router.get('/getToDo', (req, res) => {
    toDoManagement.getToDoList(req, res);
});


/*
API for deleting the todo list.
@author Abhishek Singh
*/
router.delete('/deleteToDo/:id', (req, res) => {
    toDoManagement.removeToDoList(req, res);
});


/*
API for updating the todo list.
@author Abhishek Singh
*/
router.put('/updateToDo/:id', (req, res) => {
    toDoManagement.updateToDoList(req, res);
});

module.exports = router;
