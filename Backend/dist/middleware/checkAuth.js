"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token || typeof token !== 'string') {
            throw new Error("Invalid token.");
        }
        const tokenInfo = jsonwebtoken_1.default.verify(token, 'shhh, secret token');
        console.log(tokenInfo);
        req.user = tokenInfo;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "You are not authenticated. Please log in" });
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map