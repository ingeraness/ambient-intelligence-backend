//import express from "express";
//import cors from "cors";
import { createRequire } from "module";
import { createUser, getUser } from "./models/userModel.js";
const require = createRequire(import.meta.url);

const { MongoClient } = require("mongodb");

var bodyParser = require("body-parser");

const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function listDatabases(client) {
  var databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function main() {
  const uri =
    "mongodb+srv://admin:admin123@amin.shtvc.mongodb.net/user?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    // Connect to the mongoDB cluster
    await client.connect();

    //Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// The endpoints (routes)

app.post("/user/create/", createUser);
app.get("/user/get/:name", getUser);

app.listen(5000, () => console.log(`Listening on port ${5000}`));
