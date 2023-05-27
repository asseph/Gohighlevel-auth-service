
import { registerUserSchema,loginUserSchema } from "../schema/auth.schema";
export function validateRegisterUser(req:any, res:any,next:any) {
    const { error, value } = registerUserSchema.validate(req.body);
  if (error) {
     return res.status(400).json({message:error.details[0].message})
    } else {
        
      req.body = value;
      next();
    }
  }

  export function validateLoginUser(req:any, res:any,next:any){
    const { error, value } = loginUserSchema.validate(req.body);
  if (error) {
     return res.status(400).json({message:error.details[0].message})
    } else {
        
      req.body = value;
      next();
    }
  }
  