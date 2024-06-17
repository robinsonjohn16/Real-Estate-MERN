import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
   createListing,
   showUserListing,
   deleteUserListing,
} from "../controllers/listing.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router
   .route("/create")
   .post(verifyJWT, upload.fields([{ name: "images" }]), createListing);

router.route("/listings/:id").get(verifyJWT, showUserListing);

router.route("/delete/:id").delete(verifyJWT, deleteUserListing);

export default router;