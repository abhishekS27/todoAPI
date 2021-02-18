/*
* @Author: Abhishek Singh
* @Date:   2020-02-18
*/

const queries = require('../dbConnection/queries.js');
const ObjectId = require("mongodb").ObjectID;

const toDoList = {};
module.exports = toDoList;

/**
 * This method is used to add a task.
 * @method insertTaskToDo
 * @author Abhishek Singh
 * @email   ab2781995@gmail.com
 * @project TODOAPI
 * @param   {Object}  reqData{ An object containing task and status}
 * @return  Promise   {  resolve or reject accordingly}
 */
function insertTaskToDo(reqData) {
    const data = {};
    data.task = reqData.task;
    data.status = reqData.status;
    return new Promise((resolve, reject) => {
        queries.insertToDoList(data, (err, result) => {
            if (err) {
                return reject('Error while adding the task !!');
            } else {
                return resolve();
            }
        });
    });
}


/**
 * This method is used to show specific and all todo list.
 * @method showToDoList
 * @author Abhishek Singh
 * @email   ab2781995@gmail.com
 * @project TODOAPI
 * @param   {Object}  reqData{ An object containing id or empty object}
 * @return  Promise   {  resolve or reject accordingly }
 */
function showToDoList(reqData) {
    const data = {};
    if (reqData.params.id) {
        data._id = ObjectId(reqData.params.id);
    }
    return new Promise((resolve, reject) => {
        queries.findToDoList(data, (err, result) => {
            if (err) {
                return reject("Error While Getting ToDo List");
            } else {
                return resolve(result);
            }
        });
    });
}

/**
 * This method is used to remove the task from the todo list.
 * @method removeTheTask
 * @author Abhishek Singh
 * @email   ab2781995@gmail.com
 * @project TODOAPI
 * @param   {Object}  reqData{ An object containing id }
 * @return  Promise   {  resolve or reject accordingly }
 */
function removeTheTask(reqData) {
    return new Promise((resolve, reject) => {
        queries.deleteToDoList({ _id: ObjectId(reqData.params.id) }, (err, result) => {
            if (!err && result) {
                return resolve();
            } else {
                return reject("Error While Deleting The Todo Task")
            }
        });
    });
}


/**
 * This method is used to update the todo task.
 * @method updateToDoTask
 * @author Abhishek Singh
 * @email   ab2781995@gmail.com
 * @project TODOAPI
 * @param   {Object}  reqData{ An object containing id ,status and task }
 * @return  Promise   {  resolve or reject accordingly }
 */
function updateToDoTask(reqData) {
    return new Promise((resolve, reject) => {
        const data = { $set: { status: reqData.body.status } }
        queries.changeToDoList({ _id: ObjectId(reqData.params.id) }, data, (err, result) => {
            if (!err && result) {
                return resolve();
            } else {
                return reject('Error While updating The ToDo Task')
            }
        });
    });
}

/**
 * This method is used to add todolist
 * @method addToDoList
 * @author Abhishek Singh
 * @email   ab2781995@gmail.com
 * @project TODOAPI
 * @param   {Object}          req {An object containing the  task and status }
 * @return  {Object}          res {json object containing success and  result or related info}
 */
toDoList.addToDoList = async function addToDoList(req, res) {
    try {
        if (!req.body.task || !req.body.status) {
            return res.json({ success: false, info: "Key Is Missing" });
        }
        await insertTaskToDo(req.body);
        return res.json({ success: true, result: "Task Is Added" });
    } catch (error) {
        return res.json({ success: false, info: error });
    }
};

/**
 * This method is get todolist specific and all accordingly
 * @method getToDoList
 * @author Abhishek Singh
 * @email   ab2781995@gmail.com
 * @project TODOAPI
 * @param   {Object}          req {An object containing the  task and status }
 * @return  {Object}          res {json object containing success and  result or related info}
 */
toDoList.getToDoList = async function getToDoList(req, res) {
    try {
        const toDoList = await showToDoList(req);
        return res.json({ success: true, result: toDoList });
    } catch (error) {
        return res.json({ success: false, info: error });
    }
};

/**
 * This method is used to remove the task from todo List
 * @method removeToDoList
 * @author Abhishek Singh
 * @email   ab2781995@gmail.com
 * @project TODOAPI
 * @param   {Object}          req {An object containing the  id }
 * @return  {Object}          res {json object containing success and  result or related info}
 */
toDoList.removeToDoList = async function removeToDoList(req, res) {
    try {
        if (!req.params.id) {
            return res.json({ success: false, info: "keys are missing" });
        }
        const toDoList = await showToDoList(req);
        if (toDoList.length == 1) {
            await removeTheTask(req)
            return res.json({ success: true, result: "Task Has Been Deleted" });
        }
    } catch (error) {
        return res.json({ success: false, info: error });
    }
};


/**
 * This method update the status of todo task.
 * @method updateToDoList
 * @author Abhishek Singh
 * @email   ab2781995@gmail.com
 * @project TODOAPI
 * @param   {Object}          req {An object containing the  id and status }
 * @return  {Object}          res {json object containing success and result or related info}
 */
toDoList.updateToDoList = async function updateToDoList(req, res) {
    try {
        if (!req.params.id || !req.body.status) {
            return res.json({ success: false, info: "Key Is Missing" });
        }
        await updateToDoTask(req);
        return res.json({ success: true, result: "Status Has Been Updated" });
    } catch (error) {
        return res.json({ success: false, info: error });
    }
};