"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { usernameOrEmail, password } = req.body;
    const userTofind = usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail, isActive: true } }
        : { where: { username: usernameOrEmail, isActive: true } };
    index_1.prisma.user.findUnique({ where: {} });
    const user = yield index_1.prisma.user.findFirst(userTofind);
    if (!user) {
        res.status(401).json({
            errors: [{ field: "usernameOrEmail", message: "User doesnt exist" }],
        });
        return;
    }
    const isValid = yield argon2_1.default.verify(user.password, password);
    if (!isValid) {
        res.status(401).json({
            errors: [{ field: "password", message: "Incorrect password!" }],
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ username: user.username, email: user.email, id: user.id }, "shhh, secret token", { expiresIn: "1h" });
    res.status(200).json({ token, expiresIn: 3600000 });
});
exports.loginUser = loginUser;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };
    const hashedPw = yield argon2_1.default.hash(userInput.password);
    let user;
    try {
        user = yield index_1.prisma.user.create({
            data: {
                username: userInput.username,
                password: hashedPw,
                email: userInput.email,
            },
        });
        res.status(201).send("douu");
    }
    catch (e) {
        console.log(e);
        if (e.message.includes("User_email_key")) {
            res.status(400).json({
                errors: [{ field: "email", message: "That email is already in use." }],
            });
        }
        else if (e.message.includes("User_username_key")) {
            res.status(400).json({
                errors: [{ field: "username", message: "Username is already taken." }],
            });
        }
        res.status(500).send();
    }
});
exports.registerUser = registerUser;
const validateRegisterInput = () => { };
//# sourceMappingURL=auth.js.map