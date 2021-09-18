import { User } from ".prisma/client";
import argon2 from "argon2";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index";

export const loginUser: RequestHandler = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  const userTofind: any = usernameOrEmail.includes("@")
    ? { where: { email: usernameOrEmail, isActive: true } }
    : { where: { username: usernameOrEmail, isActive: true } };
  prisma.user.findUnique({ where: {} });

  const user = await prisma.user.findFirst(userTofind);
  if (!user) {
    res.status(401).json({
      errors: [{ field: "usernameOrEmail", message: "User doesnt exist" }],
    });
    return;
  }
  const isValid = await argon2.verify(user.password, password);
  if (!isValid) {
    res.status(401).json({
      errors: [{ field: "password", message: "Incorrect password!" }],
    });
    return;
  }

  const token = jwt.sign(
    { username: user.username, email: user.email, id: user.id },
    "shhh, secret token",
    { expiresIn: "8h" }
  );

  res.status(200).json({ token, expiresIn: 3600000 });
};

export const registerUser: RequestHandler = async (req, res, next) => {
  const userInput = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  //TODO: validate input
  const hashedPw = await argon2.hash(userInput.password);
  const pfp = `https://avatars.dicebear.com/api/jdenticon/${userInput.username}.svg`
  let user: User;
  try {
    user = await prisma.user.create({
      data: {
        username: userInput.username,
        password: hashedPw,
        email: userInput.email,
        pfp
      },
    });
    res.status(201).send("douu");
  } catch (e) {
    console.log(e);
    if (e.message.includes("User_email_key")) {
      res.status(400).json({
        errors: [{ field: "email", message: "That email is already in use." }],
      });
    } else if (e.message.includes("User_username_key")) {
      res.status(400).json({
        errors: [{ field: "username", message: "Username is already taken." }],
      });
    }
    res.status(500).send();
  }
};

const validateRegisterInput = () => {};
