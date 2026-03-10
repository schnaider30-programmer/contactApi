const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    const result = mongodb.getDb().collection("contacts").find()
    const list = await result.toArray()
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(list)
}
const getSingle = async (req, res) => {
    const userID = new objectId(req.params.id)
    const result = await mongodb.getDb().collection("contacts").findOne({ _id: userID })
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(result)

}

module.exports = {getAll, getSingle}