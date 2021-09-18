"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const checkAuth_1 = require("../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post('/login', auth_1.loginUser);
router.post('/register', auth_1.registerUser);
router.get("/secret", checkAuth_1.checkAuth, (req, res, next) => {
    res.json({ secret: 'shhh only authorized users can see this' });
});
exports.default = router;
//# sourceMappingURL=auth.js.map