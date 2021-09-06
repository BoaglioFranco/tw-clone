import jwt from "jsonwebtoken";
import { RequestHandler } from "express";



export const checkAuth: RequestHandler = (req, res, next) =>{
    try{
        console.log(req.headers);
        const token = req.headers.token;
        if(!token || typeof token !== 'string'){
            throw new Error("Invalid token.")
        }
            const tokenInfo = jwt.verify(token, 'shhh, secret token');
            next();
    }catch(err){
        res.status(401).json({message: "You are not authenticated. Please log in"});
    }
}