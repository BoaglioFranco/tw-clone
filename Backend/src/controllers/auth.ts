import argon2 from "argon2";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const loginUser: RequestHandler = async (req, res, next) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;
  

  const userTofind = usernameOrEmail.includes("@")
    ? { where: { email: usernameOrEmail } }
    : { where: { username: usernameOrEmail } };

  const user = await User.findOne(userTofind);
  if (!user) {
    res.status(401).send({
      errors: [{ field: "usernameOrEmail", message: "user doesnt exist" }],
    });
    return;
  }
  const isValid = await argon2.verify(user.password, password);
  if (!isValid) {
    res.status(401).send({
      errors: [{ field: "password", message: "incorrect password!" }],
    });
    return;
  }

  const token = jwt.sign({ userInfo: "TODO" }, "shhh, secret token");
  res.status(200).json({ token });
};

export const registerUser: RequestHandler = async (req, res, next) => {
  const userInput = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  //validate input
  //hash password
  const hashedPw = await argon2.hash(userInput.password);
  let user: User;
  try {
    user = await User.create({
      username: userInput.username,
      password: hashedPw,
      email: userInput.email,
    }).save();
    res.status(201).send();
  } catch (e) {
    if(e.message.includes('email')){
      res.status(400).json({
        errors: [{ field: "email", message: "That email is already in use." }],
      });
    } 
    else if(e.message.includes('username')){
      res.status(400).json({
        errors: [{ field: "username", message: "Username is already taken." }],
      });
    }
    res.status(500).send();
  }
};

const validateRegisterInput = () => {};
