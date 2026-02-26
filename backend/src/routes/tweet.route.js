import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTweet, deleteTweet } from "../controllers/tweet.controller.js";


const router = Router();

router.route("/create").post(verifyJWT,createTweet);
router.route("/delete/:id").delete(deleteTweet); // yaha par delete kar rh hai that's why delete use kara hai and req.params use ho rh hai that's why /:id likha hai


export default router