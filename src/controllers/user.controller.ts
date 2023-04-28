import { Request, Response, NextFunction } from "express";
import logs from "../config/log";
import db from "../database/database";

const NAMESPACE = "User Controller";

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  logs.info(NAMESPACE, `getUser called`);
  const result = await db.query("select * from users");

  return res.status(200).json({
    result: result,
  });
};

export default { createUser, getUser };
