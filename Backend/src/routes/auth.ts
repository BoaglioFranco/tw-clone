import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth";
import { checkAuth } from "../middleware/checkAuth";


const router = Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.get("/secret", 
checkAuth,
(req, res, next)=>{
    res.json({secret: 'shhh only authorized users can see this'});
});


export default router;