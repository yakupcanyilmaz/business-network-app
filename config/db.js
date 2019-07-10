const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

module.exports = {
  connectDB: async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

      console.log("MongoDB Connected");
    } catch (err) {
      console.error(err.message);
      // Exit process with failure
      process.exit(1);
    }
  }
};
