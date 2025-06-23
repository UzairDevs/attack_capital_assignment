"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const apiError_1 = require("./utils/apiError");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_route_1.default);
app.use('/api/posts', post_route_1.default);
// Error handling middleware
app.use(((err, _req, res, next) => {
    if (err instanceof apiError_1.ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
}));
exports.default = app;
