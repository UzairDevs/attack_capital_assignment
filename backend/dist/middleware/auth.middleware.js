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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const models_1 = __importDefault(require("../models"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({ message: 'Authentication required' });
        return; // ← return undefined, so Promise<void>
    }
    const token = header.split(' ')[1];
    try {
        const { userId } = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        const user = yield models_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return; // ← again, no return value
        }
        req.user = user;
        next(); // ← call next() and fall off, returns void
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
});
exports.authenticate = authenticate;
