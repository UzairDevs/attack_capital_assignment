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
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const models_1 = __importDefault(require("../models"));
const apiError_1 = require("../utils/apiError");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new apiError_1.ApiError(400, 'Email and password are required');
    }
    const existingUser = yield models_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new apiError_1.ApiError(400, 'Email already in use');
    }
    const passwordHash = yield bcryptjs_1.default.hash(password, 10);
    const user = yield models_1.default.user.create({
        data: { email, passwordHash }
    });
    res.status(201).json({ id: user.id, email: user.email });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new apiError_1.ApiError(400, 'Email and password are required');
    }
    const user = yield models_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new apiError_1.ApiError(401, 'Invalid credentials');
    }
    const passwordMatch = yield bcryptjs_1.default.compare(password, user.passwordHash);
    if (!passwordMatch) {
        throw new apiError_1.ApiError(401, 'Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.jwtSecret, {
        expiresIn: '1h'
    });
    res.json({ token, userId: user.id });
});
exports.login = login;
