import ApiError from "../error/apiError";
import { Request, Response, NextFunction } from "express";

const validateDto = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody; 
      next();
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  };
};

export default validateDto;
