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
            poolSize: 70,
            bufferMaxEntries: 0,
        });
        console.log("Connected to Mongo DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;
