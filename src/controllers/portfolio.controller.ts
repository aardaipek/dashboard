import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import { ErrorCodes } from '../model/error.codes';
import { ResponseObject } from '../model/response';
import { PortfolioService } from "../services/portfolio.service";

export class PortfolioController{
  readonly NAMESPACE = "Portfolio Controller";
  private portolioService:PortfolioService = new PortfolioService();

  async createPortfolio (req: Request, res: Response, next: NextFunction) {
    logs.info(this.NAMESPACE, `createPortfolio called`);
  
    if(!req.body || !req.body.dashboardId || !req.body.userId || !req.body.name){
      return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
    }
  
    const { dashboardId, userId, name } = req.body;
  
    const result = await this.portolioService.createPortfolio(dashboardId, userId, name)
  
    if (result.rowCount <= 0) {
      return res.status(404).json(new ResponseObject([],ErrorCodes.NOT_FOUND));
    }
  
    return res.status(200).json(new ResponseObject(result.rows));
  };
  
  async getPortfolio (req: Request, res: Response, next: NextFunction) {
    logs.info(this.NAMESPACE, `getPortfolio called`);
  
    if(!req.body || !req.body.dashboardId){
      return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
    }
  
    const { dashboardId } = req.body;
  
    const result = await this.portolioService.getPortfolio(dashboardId);
  
    if (result.rowCount <= 0) {
      return res.status(404).json(new ResponseObject([],ErrorCodes.NOT_FOUND));
    }
  
    return res.status(200).json(new ResponseObject(result.rows));
  };
}
