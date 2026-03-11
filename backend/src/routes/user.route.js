import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { RegisterUser, loginUser, logoutUser, getUserProfile, getOtherUser, follow, unfollow, updateUserDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();



router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]),RegisterUser)

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/profile/:id").get(verifyJWT,getUserProfile);
router.route("/otherusers/:id").get(verifyJWT,getOtherUser)
router.route("/follow/:id").put(verifyJWT,follow)
router.route("/unfollow/:id").put(verifyJWT,unfollow)
router.route("/update-details").put(verifyJWT,updateUserDetails);



export default router