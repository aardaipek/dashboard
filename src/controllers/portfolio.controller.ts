import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import db from "../database/database";
import { ErrorCodes } from '../model/error.codes';
import { ResponseObject } from '../model/response';

const NAMESPACE = "Portfolio Controller";

const createPortfolio =  async(req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `createPortfolio called`);

  if(!req.body || !req.body.dashboardId || !req.body.userId || !req.body.name){
    return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
  }

  const { dashboardId, userId, name } = req.body;

  const result = await db.query("insert into portfolio (dashboard_id,user_id,is_active,name,priority) values($1,$2,$3,$4,$5) returning id", [dashboardId,userId,true,name,1]);

  if (result.rowCount <= 0) {
    return res.status(404).json(new ResponseObject([],ErrorCodes.NOT_FOUND));
  }

  return res.status(200).json(new ResponseObject(result.rows));
};

const getPortfolio = async (req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `getPortfolio called`);

  if(!req.body || !req.body.dashboardId){
    return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
  }

  const { dashboardId } = req.body;

  const result = await db.query("select * from portfolio where dashboard_id = $1", [dashboardId]);

  if (result.rowCount <= 0) {
    return res.status(404).json(new ResponseObject([],ErrorCodes.NOT_FOUND));
  }

  return res.status(200).json(new ResponseObject(result.rows));
};

const getHoldings = async (req: Request, res: Response, next: NextFunction) => {};

export default { createPortfolio, getPortfolio, getHoldings };
