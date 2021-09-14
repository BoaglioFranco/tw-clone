import { Router } from "express";
import { createTwit, getTwits, likeTwit } from "../controllers/twit";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.post("/twit/create", checkAuth, createTwit);

router.get("/twit/getAll", checkAuth, getTwits);

router.post("/twit/like", checkAuth, likeTwit);


export default router;
