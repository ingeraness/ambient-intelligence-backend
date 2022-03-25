//import express from "express";
//import cors from "cors";
import { createRequire } from "module";
import mongoose from "mongoose";
import { createUser, getUser, getAllUsers } from "./models/userModel.js";

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

  app.listen(5000, () => {
    console.log("Server has started!");
  });
});

/*async function listDatabases(client) {
  var databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function main() {
  

  const client = new MongoClient(uri);

  try {
    // Connect to the mongoDB cluster
    await client.connect();

    //Make the appropriate DB calls
    //await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);*/

// The endpoints (routes)

//app.listen(5000, () => console.log(`Listening on port ${5000}`));
