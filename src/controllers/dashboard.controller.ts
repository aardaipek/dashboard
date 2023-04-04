import { Request, Response, NextFunction } from "express";
import logs from "../config/log";

const NAMESPACE = "Dashboard Controller";

const calculateCompoundInterest = (req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `Dashboard API called`);

  let currentAmount; 
  const principal = Number(req.query.principal);
  const rate = Number(req.query.rate);
  const year = Number(req.query.year);
  const profit = Number(rate / 100); 
  const workmonth = Number(year * 12);
  const result = [];

  for (let i = 1; i <= workmonth; ++i) {
    currentAmount = principal * Math.pow(1.0 + profit, i);
    result.push({
      "Principal": principal,
      "Profit": Number(profit).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}),
      "Work Year": workmonth / 12,
      "Month": i,
      "Amount": currentAmount.toFixed(3),
    });
  }

  return res.status(200).json({
    result: result,
  });
};

export default { calculateCompoundInterest };
