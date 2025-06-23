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
exports.getPosts = exports.createPost = void 0;
const models_1 = __importDefault(require("../models"));
const apiError_1 = require("../utils/apiError");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const userId = req.user.id;
    if (!title || !content) {
        throw new apiError_1.ApiError(400, 'Title and content are required');
    }
    const post = yield models_1.default.post.create({
        data: {
            title,
            content,
            authorId: userId
        }
    });
    res.status(201).json(post);
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.query.author ? parseInt(req.query.author) : undefined;
    const posts = yield models_1.default.post.findMany({
        where: authorId ? { authorId } : undefined,
        include: {
            author: {
                select: {
                    id: true,
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    res.json(posts);
});
exports.getPosts = getPosts;
