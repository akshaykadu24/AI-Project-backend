const express = require("express");
const UserModel = require("../modules/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


userRouter.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
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
          await UserModel.create({ name, email, password:hash });
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
          msg: "Login successfully",
          token: token,
          user: user[0]._id,
          name: user[0].name,
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
