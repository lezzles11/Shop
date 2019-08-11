const mongoose = require("mongoose");
const db = `mongodb+srv://lezzles:${password}@cluster-21dks.mongodb.net/asdf?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
