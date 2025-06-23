"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/blogdb'
};
