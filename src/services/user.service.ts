import db from "../database/database";
import { ErrorCodes } from "../model/error.codes";
import { ResponseObject } from "../model/response";

export class UserService {
  constructor() {}

  async createUser(mail:any, name:any, surname:any) {
    const result = await db.query("insert into users (email,name,surname,is_active) values($1,$2,$3, $4) returning id", [mail,name,surname,true]);

    if (result.rowCount <= 0) {
      throw new ResponseObject([], ErrorCodes.NOT_FOUND);
    }

    return result;
  }

  async updateStatus(status:any, id:any) {
    const result = await db.query("update users set is_active = $1 where id = $2", [status,id]);

    if (result.rowCount <= 0) {
      throw new ResponseObject([], ErrorCodes.NOT_FOUND);
    }

    return result;
  }

  async getUser(mail:any) {
    const result = await db.query("select * from users where email = $1", [mail]);

    if (result.rowCount <= 0) {
      throw new ResponseObject([], ErrorCodes.NOT_FOUND);
    }

    return result;
  }
}
