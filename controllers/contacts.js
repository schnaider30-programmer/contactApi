const { response } = require("express");
const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = mongodb.getDb().collection("contacts").find();
  const list = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(list);
};

const getSingle = async (req, res) => {
  const userID = new objectId(req.params.id);
  const result = await mongodb
    .getDb()
    .collection("contacts")
    .findOne({ _id: userID });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDb()
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Something went wrong while adding new contact.");
  }
};

const updateContact = async (req, res) => {
  const contactId = new objectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Something went wrong while updating contact.");
  }
};

const deleteContact = async (req, res) => {
  const contactId = new objectId(req.params.id);
  const response = await mongodb.getDb()
    .collection("contacts")
    .deleteOne({ _id: contactId });
  if (response.deletedCount) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Something went wrong while removing contact.");
  }
};
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
