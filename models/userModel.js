import mongoose from "mongoose";

const Schema = mongoose.Schema;

var userSchema = Schema({
  name: String,
  yearBorn: Number,
  role: Number,
  preference: Number,
  faceID: String,
});

var UserModel = mongoose.model("UserModel", userSchema);

export const getAllUsers = async (req, res) => {
  UserModel.find()
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send(err));
};

export const getUser = async (req, res) => {
  const name = req.params.name;

  UserModel.findOne({ name: name })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(400).send(err));
};

export const createUser = async (req, res) => {
  var newUser = new UserModel(req.body);

  newUser
    .save()
    .then(() =>
      res.status(200).send({
        success: true,
        message: "User created",
      })
    )
    .catch((err) => res.status(400).send({ success: false, message: err }));
};

export const getUserIdByName = async (req, res) => {
  const name = req.params.name;

  UserModel.findOne({ name: name })
    .then((user) => res.status(200).send(user.faceID))
    .catch((err) => res.status(400).send(err));
};
