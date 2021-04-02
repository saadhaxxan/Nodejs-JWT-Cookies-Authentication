const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/authappjwt";

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection Success");
  })
  .catch((e) => {
    console.log("Connection Error");
  });
