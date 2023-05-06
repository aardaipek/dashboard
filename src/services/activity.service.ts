import db from "../database/database";
import { ErrorCodes } from "../model/error.codes";
import { ResponseObject } from '../model/response';


export class ActivityService {
  constructor() {}

  async addActivity(portfolioId:any, type:any, quantity:any, name:any, price:any) {
    const result = await db.query("insert into portfolio_activities (portfolio_id,type,quantity,name,price) values($1,$2,$3,$4,$5) returning id", [portfolioId,type,quantity,name,price]);
    
    if (result.rowCount <= 0) {
      throw new ResponseObject([], ErrorCodes.NOT_FOUND);
    }

    return result;
  }

  async getActivity(portfolioId:any) {
    const result = await db.query("select * from portfolio_activities where portfolio_id = $1 and is_success", [portfolioId]);
    
    if (result.rowCount <= 0) {
      throw new ResponseObject([], ErrorCodes.NOT_FOUND);
    }

    return result;
  }
}
