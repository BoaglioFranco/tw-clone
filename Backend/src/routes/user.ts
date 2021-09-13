import { Router } from "express";
import { followUser, getProfile, unfollowUser } from "../controllers/user";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.post("/user/follow", checkAuth, followUser);

router.post("/user/unfollow", checkAuth, unfollowUser);

router.get("/user/getProfile", checkAuth, getProfile);

router.get("/user/getTwits", )

export default router;
