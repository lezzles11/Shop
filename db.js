require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const USER = process.env.USERNAME_MONGODB;
const PASSWORD = process.env.PASSWORD_MONGODB;
const db = `mongodb+srv://${USER}:${PASSWORD}@cluster-21dks.mongodb.net/asdf?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });
    mongoose.Promise = global.Promise;
    console.log("MongoDB connected to database!");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
