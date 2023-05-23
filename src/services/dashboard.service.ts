import db from "../database/database";
import { ErrorCodes } from "../model/error.codes";
import { ResponseObject } from '../model/response';


export class DashboardService {
  constructor() {}

  async createDashboard(name:any, userId:any) {
    const result = await db.query("insert into dashboard (name,user_id,is_active) values($1,$2,$3) returning id",[name, userId, true]);

    if (result.rowCount <= 0) {
       throw new ResponseObject([], ErrorCodes.NOT_FOUND);
    }

    return result;
  }
}
