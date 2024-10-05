import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { categoryRouter } from "../modules/category/category.route";
import { postRouter } from "../modules/Post/post.route";
import { commentRouter } from "../modules/comment/comment.route";
import { paymentRouter } from "../modules/payment/payment.route";

const router = Router();

const routeArray = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/category",
    route: categoryRouter,
  },
  {
    path: "/post",
    route: postRouter,
  },
  {
    path: "/comment",
    route: commentRouter,
  },
  {
    path: "/payment",
    route: paymentRouter,
  },
];

routeArray.forEach((item) => {
  router.use(item.path, item.route);
});

export const MainRouter = router;
