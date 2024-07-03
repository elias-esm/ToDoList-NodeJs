//  *DB file
//  log() in this file start with : AaA

const { MongoClient } = require('mongodb');

let db = null;
const DB_CONFIG = {
    url: 'mongodb://127.0.0.1:27017',
    dbName: 'ToDo-List'
};

async function connectToMongoDB() {
    const client = new MongoClient(DB_CONFIG.url);
    await client.connect();
    db = client.db(DB_CONFIG.dbName);
    console.log('AaA Successfully connected to MongoDB:', DB_CONFIG.dbName);

}

function getDB() {
    if (!db) {
        throw new Error("AaA Database not initialized because of an unexpected error!");
    }
    return db;
}

module.exports = { connectToMongoDB, getDB };

