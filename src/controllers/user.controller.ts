import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import { ErrorCodes } from '../model/error.codes';
import { ResponseObject } from '../model/response';
import { UserService } from "../services/user.service";

export class UserController{
  readonly NAMESPACE = "User Controller";
  private userService:UserService = new UserService();

  async createUser (req: Request, res: Response, next: NextFunction) {
    logs.info(this.NAMESPACE, `createUser called`);
  
    if(!req.body || !req.body.mail || !req.body.name || !req.body.surname){
      return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
    }
  
    const { mail, name, surname } = req.body;
  
    const result = await this.userService.createUser(mail, name, surname);
    
    return res.status(200).json(new ResponseObject(result.rows));
  
  };
  
  async updateStatus (req: Request, res: Response, next: NextFunction) {
      logs.info(this.NAMESPACE, `updateUserActive called`);
    
      if(!req.body || !req.body.id || !req.body.status){
        return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
      }
    
      const { status, id } = req.body;
    
      const result = await this.userService.updateStatus(status, id);
    
      return res.status(200).json(new ResponseObject(result.rows));
    
  };
  
  async getUser (req: Request, res: Response, next: NextFunction) {
    logs.info(this.NAMESPACE, `getUser called`);
  
    if(!req.body || !req.body.mail){
      return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
    }
  
    const { mail } = req.body;
  
    const result = await this.userService.getUser(mail);
  
    return res.status(200).json(new ResponseObject(result.rows));
  };

}