import { createRequire } from "module";
import mongoose from "mongoose";
import {
  createUser,
  getUser,
  getAllUsers,
  getUserIdByName,
} from "./models/userModel.js";

const require = createRequire(import.meta.url);
var cors = require("cors");
const { MongoClient } = require("mongodb");

var bodyParser = require("body-parser");

const express = require("express");
//const app = express();

const uri =
  "mongodb+srv://admin:admin123@amin.shtvc.mongodb.net/user?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(express.json()); // new
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.post("/user/userDB/create", createUser);
  app.get("/user/userDB/get/:name", getUser);
  app.get("/user/userDB/getAll", getAllUsers);
  app.get("/user/userDB/getFaceID/:name", getUserIdByName);

  app.listen(5000, () => {
    console.log("Server has started!");
  });
});
