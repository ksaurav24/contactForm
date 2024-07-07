const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();
const FormData = require("./db");

const authenticateJWT = require("./middlewares/jwt");
const authenticateInput = require("./middlewares/inputValidation");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submit", authenticateInput, authenticateJWT, async (req, res) => {
  const { fullname, email, company, message } = req.user;
  const formData = new FormData({
    fullname,
    email,
    company,
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
  console.log(`Example app listening at http://localhost:${port}`);
});
