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
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const twit_1 = __importDefault(require("./routes/twit"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require(".prisma/client");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
exports.prisma = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"],
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const port = 5000;
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(auth_1.default);
    app.use(user_1.default);
    app.use(twit_1.default);
    app.listen(port, () => {
        console.log(`Server up and running on port ${port}`);
    });
});
main().finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
}));
//# sourceMappingURL=index.js.map