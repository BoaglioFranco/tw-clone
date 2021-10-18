import { Router } from "express";
import { followUser, getProfile, getUserLikes, getUserTwits, unfollowUser } from "../controllers/user";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.post("/user/follow", checkAuth, followUser);

router.post("/user/unfollow", checkAuth, unfollowUser);

router.get("/user/getProfile", checkAuth, getProfile);

router.get("/user/getTwits", checkAuth, getUserTwits);

router.get("/user/getLikes", checkAuth, getUserLikes);



export default router;
