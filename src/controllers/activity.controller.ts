import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import { ErrorCodes } from '../model/error.codes';
import { ResponseObject } from '../model/response';
import { ActivityTypes } from '../model/activity.types';
import { ActivityService } from "../services/activity.service";

export class ActivityController {
  readonly NAMESPACE = "Activity Controller";
  private activityService: ActivityService = new ActivityService();

  async getActivities (req: Request, res: Response, next: NextFunction){
    logs.info(this.NAMESPACE, `getActivities called`);

    if(!req.body || !req.body.portfolioId){
      return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
    }
  
    const { portfolioId } = req.body;
  
    const result = await this.activityService.getActivity(portfolioId);
  
    return res.status(200).json(new ResponseObject(result.rows));
  }

  async addActivity (req: Request, res: Response, next: NextFunction){
    logs.info(this.NAMESPACE, `addActivity called`);

    // TODO: Add date as an input from client
    if(!req.body || !req.body.portfolioId || !req.body.quantity || !req.body.price || !req.body.name || !req.body.type){
      return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
    }
  
    const { portfolioId, quantity, price, name, type } = req.body;
  
    const result = await this.activityService.addActivity(portfolioId, type, quantity, name, price);
  
    return res.status(200).json(new ResponseObject(result.rows));
  }
}
