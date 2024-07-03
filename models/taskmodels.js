//for type of tasks find-update-delete-insert

const { getDB } = require("../utils/mongo-connection");
const { ObjectId } = require('mongodb')

async function findTasks() {
    const db = getDB();
    return await db.collection('tasks').find({}).toArray()
}

async function updateTask(id, taskUpdate) {
    const db = getDB();
    return await db.collection('tasks').updateOne({ _id: new ObjectId(id) }, { $set: taskUpdate });
}

async function deleteTask(id) {
    const db = getDB()
    return await db.collection('tasks').deleteOne({ _id: new ObjectId(id) })
}

async function insertTask(task) {
    const db = getDB();
    return await db.collection('tasks').insertOne(task);
}

module.exports = { insertTask, updateTask, deleteTask, findTasks };

