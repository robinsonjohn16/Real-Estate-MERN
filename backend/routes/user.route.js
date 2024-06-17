import { Router } from "express";
import {
   registerUser,
   loginUser,
   googleLogin,
   uploadAvatar,
   updateUser,
   deleteUser,
   logoutUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/uploadAvatar").post(upload.single("avatar"), uploadAvatar);
router.route("/google").post(googleLogin);
router.route("/updateUser/:id").put(verifyJWT, updateUser);
router.route("/delete").delete(verifyJWT, deleteUser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
