const express = require("express");
const UserModel = require("../modules/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { status } = require("init");

userRouter.post("/register", async (req, res) => {
  let { fname, lname, email, password } = req.body;
  let oldUser = await UserModel.find({ email });
  console.log(oldUser, "oldUser");
  if (oldUser?.length > 0) {
    res.send({ msg: "This Email id is already registered" });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "User Registation failed" });
        } else {
          await UserModel.create({ fname, lname, email, password: hash });
          res.send({ msg: "User is Created successfully" });
        }
      });
    } catch (error) {
      res.send({ msg: "error with Registering User" });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await UserModel.find({ email });
  if (user?.length > 0) {
    let passDecript = await bcrypt.compare(password, user[0].password);
    if (passDecript) {
      let token = jwt.sign({ userID: user[0]._id }, "shhhh");
      if (token) {
        res.send({
          status: "success",
          msg: "Login successfully",
          token: token,
          user: user[0]._id,
          fname: user[0].fname,
        });
      } else {
        res.send({ msg: "Token is missing" });
      }
    } else {
      res.send({ msg: "Wrong Password" });
    }
  } else {
    res.send({ msg: "user is not Registred" });
  }

  res.send({ data: "user is working" });
});

module.exports = userRouter;
