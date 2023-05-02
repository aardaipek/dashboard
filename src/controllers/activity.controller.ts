import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import db from "../database/database";
import { ErrorCodes } from '../model/error.codes';
import { ResponseObject } from '../model/response';
import { ActivityTypes } from '../model/activity.types';

const NAMESPACE = "Activity Controller";

const getActivities = async (req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `getActivities called`);

  if(!req.body || !req.body.portfolioId){
    return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
  }

  const { portfolioId } = req.body;

  const result = await db.query("select * from portfolio_activities where portfolio_id = $1 and is_success", [portfolioId]);

  if (result.rowCount <= 0) {
    return res.status(404).json(new ResponseObject([],ErrorCodes.NOT_FOUND));
  }

  return res.status(200).json(new ResponseObject(result.rows));
};

const addActivity = async (req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `addActivity called`);

  // TODO: Add date as an input from client
  if(!req.body || !req.body.portfolioId || !req.body.quantity || !req.body.price || !req.body.name || !req.body.type){
    return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
  }

  const { portfolioId, quantity, price, name, type } = req.body;

  const result = await db.query("insert into portfolio_activities (portfolio_id,type,quantity,name,price) values($1,$2,$3,$4,$5) returning id", [portfolioId,type,quantity,name,price]);

  if (result.rowCount <= 0) {
    return res.status(404).json(new ResponseObject([],ErrorCodes.NOT_FOUND));
  }

  return res.status(200).json(new ResponseObject(result.rows));
};

export default { getActivities, addActivity };
