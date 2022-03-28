import mongoose from "mongoose";

const Schema = mongoose.Schema;

var userSchema = Schema({
  name: String,
  yearBorn: Number,
  role: Number,
  preference: Number,
});

var UserModel = mongoose.model("UserModel", userSchema);

/*export const getUser = (req, res) => {
  const { searchUsername } = req.params;

  userModel
    .find({ name: searchUsername })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(400).send(err));
};*/

export const getAllUsers = async (req, res) => {
  //var oneUser = await UserModel.find();
  //console.log(oneUser);
  UserModel.find()
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send(err));
};

export const getUser = async (req, res) => {
  const name = req.params.name;
  console.log(name);

  UserModel.find({ name: name })
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
