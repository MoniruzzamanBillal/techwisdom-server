import { NextFunction, Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import { upload } from "../../util/SendImageCloudinary";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchemas } from "../user/user.validation";
import { authValidations } from "./auth.validation";

const router = Router();

// ! for registering a user
router.post(
  "/register",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  validateRequest(userValidationSchemas.createUserValidationSchema),
  authController.createUser
);

// ! for registering an admin user
router.post(
  "/admin-register",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidationSchemas.createAdminUser),
  authController.createAdminUser
);


router.post(
  "/signin",
  validateRequest(authValidations.loginValidationSchema),
  authController.signIn
);



// ! for reseting password
router.patch(
  "/reset-password",
 
  authController.resetPassWord
);




// ! for updating user
router.patch(
  "/user-update/:id",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidationSchemas.updateAdminUser),
  authController.updateUser
);


// ! for sending reset link to email
router.patch("/reset-link/:email", authController.sendResetLink);





//
export const authRouter = router;
