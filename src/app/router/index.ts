import { Router } from "express";
import { testRouter } from "../modules/boilerModule/test.route";
import { authRouter } from "../modules/auth/auth.route";
import { categoryRouter } from "../modules/category/category.route";
import { postRouter } from "../modules/Post/post.route";

const router = Router();

const routeArray = [
  {
    path: "/test",
    route: testRouter,
  },
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
];

routeArray.forEach((item) => {
  router.use(item.path, item.route);
});

export const MainRouter = router;
