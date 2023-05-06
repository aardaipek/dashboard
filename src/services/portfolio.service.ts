import db from "../database/database";
import { ErrorCodes } from "../model/error.codes";
import { ResponseObject } from '../model/response';


export class PortfolioService {
  constructor() {}

  async createPortfolio(dashboardId:any, userId:any, name:any) {
    const result = await db.query("insert into portfolio (dashboard_id,user_id,is_active,name,priority) values($1,$2,$3,$4,$5) returning id", [dashboardId,userId,true,name,1]);
    
    if (result.rowCount <= 0) {
      throw new ResponseObject([], ErrorCodes.NOT_FOUND);
    }

    return result;
  }

  async getPortfolio(dashboardId:any) {
    const result = await db.query("select * from portfolio where dashboard_id = $1", [dashboardId]);
    
    if (result.rowCount <= 0) {
      throw new ResponseObject([], ErrorCodes.NOT_FOUND);
    }

    return result;
  }
}
