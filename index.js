const express = require("express");
const path = require("path");
const Users = require("./models/Users");
const bodyParser = require("body-parser");
const database = require("./db/conn");
const bcrypt = require("bcryptjs");
const Auth = require("./middlewares/Auth");
const cookieParser = require("cookie-parser");
var session = require("express-session");
const cors = require("cors");
const app = express();

const staticPath = path.join(__dirname, "static");

app.use(express.static(staticPath));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/static/login.html");
});

app.get("/dashboard", Auth, (req, res) => {
  res.sendFile(__dirname + "/static/dashboard.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/static/signup.html");
});

app.post("/login", async function (req, res, next) {
  try {
    const email = req.body.username;
    const password = req.body.password;
    const result = await Users.findOne({ email: email });
    const validcomplete = bcrypt.compare(password, result.password);
    if (validcomplete) {
      const token = await result.generateToken();
      res.cookie("jwt", token, { secure: true, httpOnly: true });
      res.status(201).send("Successfully Logged in");
    } else {
      res.send("invalid form");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/signup", async function (req, res, next) {
  try {
    const password = req.body.passwordsignup;
    const cpassword = req.body.passwordsignup_confirm;
    if (password === cpassword) {
      const User = new Users({
        username: req.body.usernamesignup,
        email: req.body.emailsignup,
        password: req.body.passwordsignup,
      });
      const user = await User.save();

      res.redirect("/login");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(5000);
