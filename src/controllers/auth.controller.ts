import { Request, Response, NextFunction } from "express";

import * as jwt from "jsonwebtoken";

import AuthModel from "../models/auth.model";
class AuthController {
  

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email,password } = req.body;
     
      const user = await AuthModel.create({
        email,
        password
        
      });
      if (user) {
        res.status(200).json({
          message: "A user have been created!",
          code: 200,
          data: user,
        });
      } else {
        res.json({
          message: "user not able to create!",
          code: 201,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email,password } = req.body;

      const user = await AuthModel.findOne({
        email,
        password
        
      });
      if (user) {
        
        jwt.sign({'authenticatedUser': user}, process.env.JWT_SECRET as string, function (err:any, token:any) {
          if(err) {
            res.json({
              message: err,
              code: 202,
            });
          }
          else {
            req.sessionID = token;
          res.status(200).json({
            message: "A user loggedIn!",
          code: 200,
          user:{
            userID:user?._id?.toString(),
            email:email,
            token: req.sessionID  
          },
          
             
          });
          }
          
          

      });
        
      } else {
        res.json({
          message: "user not able to authenticate!",
          code: 201,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try{
      
      req.session.destroy((err:any)=>{
        if(err){
          res.status(202).json({
            message: err,
            code:202
          });
        }
        else {
          res.status(200).json({
            message: "User logout successfully",
            code:200
          });
        }
      })
    }
    catch(err){
      next(err);
    }
  }

  

  
}
export default AuthController;


