import { Request, Response, NextFunction } from "express";
import logs from "../config/log";

const NAMESPACE = "Dashboard Controller";

const calculateCompoundInterest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const summary = (req: Request, res: Response, next: NextFunction) => {};

export default { calculateCompoundInterest };
