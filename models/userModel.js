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

export const getUser = async (req, res) => {
  console.log("in get");

  const name = req.params;

  UserModel.find({ username: name })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(400).send(err));
};

export const createUser = async (req, res) => {
  // create user
  console.log("CREATING!!");
  var newUser = new UserModel({
    name: req.body.name,
    yearBorn: req.body.yearBorn,
    role: req.body.role,
    preference: req.body.preference,
  });

  console.log(newUser.name);

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
