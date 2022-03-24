const { MongoClient } = require("mongodb");

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

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
