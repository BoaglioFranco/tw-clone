import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { TokenUserInfo } from "../models/TokenUserInfo";



export const checkAuth: RequestHandler = (req, res, next) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token || typeof token !== 'string'){
            throw new Error("Invalid token.")
        }
            const tokenInfo = jwt.verify(token, 'shhh, secret token') as TokenUserInfo;
            console.log(tokenInfo);
            req.user = tokenInfo;

            next();
    }catch(err){
        res.status(401).json({message: "You are not authenticated. Please log in"});
    }
}