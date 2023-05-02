import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import db from "../database/database";
import { ErrorCodes } from '../model/error.codes';
import { ResponseObject } from '../model/response';

const NAMESPACE = "Dashboard Controller";

const calculateCompoundInterest = (req: Request,res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `Dashboard API called`);

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

const createDashboard = async (req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `createDashboard called`);

  if(!req.body || !req.body.name || !req.body.userId){
    return res.status(400).json(new ResponseObject([],ErrorCodes.MISSING_PARAMETERS));
  }

  const { name, userId } = req.body;

  const result = await db.query("insert into dashboard (name,user_id,is_active) values($1,$2,$3) returning id", [name,userId,true]);

  if (result.rowCount <= 0) {
    return res.status(404).json(new ResponseObject([],ErrorCodes.NOT_FOUND));
  }

  return res.status(200).json(new ResponseObject(result.rows));
};

export default { calculateCompoundInterest, createDashboard };
