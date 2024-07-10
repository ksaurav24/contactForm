const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const FormData = mongoose.model("FormData", {
  fullname: String,
  email: String,
  contact: Number,
  message: String,
});

module.exports = FormData;
