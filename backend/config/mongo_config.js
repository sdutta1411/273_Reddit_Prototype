<<<<<<< HEAD
const mongoose = require("mongoose");

const config = {};

config.db = {};
config.db.username = 'admin';
config.db.password = 'admin123';
config.db.dbname = 'reddit_db';
config.db.conn = `mongodb+srv://${config.db.username}:${config.db.password}@redditcluster.hg7v9.mongodb.net/${config.db.dbname}?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(config.db.conn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10,
            bufferMaxEntries: 0,
        });
        console.log("Connected to Mongo DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;
=======
const MongoClient = require('mongodb').MongoClient
 
// Note: A production application should not expose database credentials in plain text.
const MONGO_URI = "mongodb+srv://admin:admin123@redditcluster.hg7v9.mongodb.net/reddit_db?retryWrites=true&w=majority"
//const MKTG_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>"
 
function connect(url) {
  return MongoClient.connect(url).then(client => client.db())
}
 
module.exports = async function() {
  let databases = await Promise.all([connect(MONGO_URI)])
 
  return {
    production: databases[0],
  }
}
>>>>>>> af8a5551c08dd5f45bcda49e4e10bf0e74a6d735
