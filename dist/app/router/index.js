"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const category_route_1 = require("../modules/category/category.route");
const post_route_1 = require("../modules/Post/post.route");
const comment_route_1 = require("../modules/comment/comment.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const routeArray = [
    {
        path: "/auth",
        route: auth_route_1.authRouter,
    },
    {
        path: "/category",
        route: category_route_1.categoryRouter,
    },
    {
        path: "/post",
        route: post_route_1.postRouter,
    },
    {
        path: "/comment",
        route: comment_route_1.commentRouter,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRouter,
    },
];
routeArray.forEach((item) => {
    router.use(item.path, item.route);
});
exports.MainRouter = router;
