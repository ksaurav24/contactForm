const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const dotenv = require("dotenv");
dotenv.config();
const FormData = require("./db");

const authenticateJWT = require("./middlewares/jwt");
const authenticateInput = require("./middlewares/inputValidation");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submit", authenticateInput, async (req, res) => {
  const { firstname, lastname, email, contact, message } = req.user;
  const formData = new FormData({
    firstname,
    lastname,
    email,
    contact,
    message,
  });
  try {
    await formData.save();
    res.send("Form data saved successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
