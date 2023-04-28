import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import db from "../database/database";
import { ErrorCodes } from '../model/errorCodes';
import { ResponseObject } from '../model/response';

const NAMESPACE = "User Controller";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `createUser called`);
  const { mail } = req.body;
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `getUser called`);

  if(!req.body || !req.body.mail){
    return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
  }

  const { mail } = req.body;

  const result = await db.query("select * from users where email = $1", [mail]);

  if (result.rowCount <= 0) {
    return res.status(404).json(new ResponseObject([],ErrorCodes.NOT_FOUND));
  }

  return res.status(200).json(new ResponseObject(result.rows));
};

export default { createUser, getUser };
