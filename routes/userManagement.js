const queries = require('../dbConnection/queries.js');
const users = {};
module.exports = users;

function insertUsers(reqData) {
    const data = {};
    data.userId = reqData.userId;
    data.active = reqData.active;
    return new Promise((resolve, reject) => {
        queries.insertUsers(data, (err, result) => {
            if (err) {
                return reject('Error while adding users !!');
            } else {
                return resolve();
            }
        });
    });
}

function updateProcess(reqData) {
    return new Promise((resolve, reject) => {
        reqData.forEach( async element => {
         });
        queries.changeToDoList({ _id: ObjectId(reqData.params.id) }, data, (err, result) => {
            if (!err && result) {
                return resolve();
            } else {
                return reject('Error While update user')
            }
        });
    });
}

function findUserData(reqData) {
    return new Promise((resolve, reject) => {
        const data = { userId: { $in: reqData } }
        queries.findUsers(data, (err, result) => {
            if (!err && result) {
                return resolve(result);
            } else {
                return reject('Error While update user')
            }
        });
    });
}

users.addUser = async function addUser(req, res) {
    try {
        if (!req.body.userId ) {
            return res.json({ success: false, info: "Key Is Missing" });
        }
        await insertUsers(req.body);
        return res.json({ success: true, result: "User Is Added" });
    } catch (error) {
        return res.json({ success: false, info: error });
    }
};

users.updateUsers = async function updateUsers(req, res) {
    try {
        if (!req.body.users || !req.body.process || !req.body.role ||!req.body.assinged ) {
            return res.json({ success: false, info: "Key Is Missing" });
        }
        const users = await findUserData(req.body.users);
        const userUpdate = await updateProcess(users);
        const users = await findUserData(req.body.users);
        return res.json({ success: true, result: users });
    } catch (error) {
        return res.json({ success: false, info: error });
    }
};