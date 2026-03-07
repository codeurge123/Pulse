import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { RegisterUser, loginUser, logoutUser, bookmarks, getUserProfile, getOtherUser, follow, unfollow } from "../controllers/user.controller.js";
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
router.route('/bookmarks/:id').put(verifyJWT,bookmarks);
router.route("/profile/:id").get(verifyJWT,getUserProfile);
router.route("/otherusers/:id").get(verifyJWT,getOtherUser)
router.route("/follow/:id").put(verifyJWT,follow)
router.route("/unfollow/:id").put(verifyJWT,unfollow)



export default router