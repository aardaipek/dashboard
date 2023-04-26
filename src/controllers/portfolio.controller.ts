import { Request, Response, NextFunction } from "express";
import logs from "../config/log";

const NAMESPACE = "Portfolio Controller";

const getPortfolio = (req: Request, res: Response, next: NextFunction) => {};

const getPortfolios = (req: Request, res: Response, next: NextFunction) => {};

const getHoldings = (req: Request, res: Response, next: NextFunction) => {};

const getActivities = (req: Request, res: Response, next: NextFunction) => {};

export default { getPortfolio, getPortfolios };
