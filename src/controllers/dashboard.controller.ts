import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import { ErrorCodes } from '../model/error.codes';
import { ResponseObject } from '../model/response';
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {
  readonly NAMESPACE = "Dashboard Controller";
  private dashboardService:DashboardService = new DashboardService();

  async calculateCompoundInterest (req: Request,res: Response, next: NextFunction) {
    logs.info(this.NAMESPACE, `Dashboard API called`);
  
    let currentAmount;
    const { principal, rate, year } = req.body;
    const profit = Number(rate / 100);
    const workmonth = Number(year * 12);
    const result = [];
  
    for (let i = 1; i <= workmonth; ++i) {
      currentAmount = principal * Math.pow(1.0 + profit, i);
      result.push({
        principal: principal,
        profit: Number(profit).toLocaleString(undefined, {
          style: "percent",
          minimumFractionDigits: 2,
        }),
        workYear: workmonth / 12,
        month: i,
        amount: currentAmount.toFixed(3),
      });
    }
  
    return res.status(200).json({
      result: result,
    });
  };
  
  async createDashboard (req: Request, res: Response, next: NextFunction) {
    logs.info(this.NAMESPACE, 'createDashboard called');
  
    if(!req.body || !req.body.name || !req.body.userId){
      return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
    }
  
    const { name, userId } = req.body;
  
    const result = await this.dashboardService.createDashboard(name,userId);
  
    return res.status(200).json(new ResponseObject(result.rows));
  };
}

