"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const post_controller_1 = require("../controllers/post.controller");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, post_controller_1.createPost);
router.get('/', post_controller_1.getPosts);
exports.default = router;
