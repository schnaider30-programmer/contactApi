const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGODB_URI;
let _db;

const initDb = async (callback) => {
  if (_db) {
    console.log("Connection to MongoDb is already established.");
    callback(null, _db);
  }
  try {
    const client = await MongoClient.connect(url);
    let dbName = process.env.DATABASE_NAME || "contactApi";
    _db = client.db(dbName);
    callback(null, _db);
  } catch (error) {
    callback(error);
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error("Coonection to database not established.");
  }
  return _db;
};

module.exports = { initDb, getDb };
